'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export async function rateEssay(essayId: string, value: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('Korisnik nije prijavljen');
  }

  if (value < 1 || value > 5) {
    throw new Error('Ocena mora biti između 1 i 5');
  }

  // Provera da li sastav postoji
  const essay = await prisma.essay.findUnique({
    where: {
      id: essayId,
    },
  });

  if (!essay) {
    throw new Error('Sastav ne postoji');
  }

  const rating = await prisma.rating.upsert({
    where: {
      userId_essayId: {
        userId: user.id,
        essayId: essayId,
      },
    },
    create: {
      userId: user.id,
      essayId: essayId,
      value: value,
    },
    update: {
      value: value,
    },
  });

  // Izracunavanje novih proseka i broja ocena
  const essayRatingAverage = await prisma.rating.aggregate({
    where: {
      essayId: essayId,
    },
    _avg: {
      value: true,
    },
    _count: {
      value: true,
    },
  });

  const ratingCount = essayRatingAverage._count.value || 0;
  const averageRating = essayRatingAverage._avg.value || 0;

  // Azuriramo denormalizovana polja u tabeli essay (zbog performansi jer cesce se cita nego nego pise)
  await prisma.essay.update({
    where: {
      id: essayId,
    },
    data: {
      averageRating: averageRating,
      ratingCount: ratingCount,
    },
  });

  revalidateTag('essays');
  revalidateTag(`essay-${essayId}`);

  // Vracamo nove vrednosti zbog brzog azuriranja UI-a
  return {
    newAverageRating: averageRating,
    newRatingCount: ratingCount,
  };
}
