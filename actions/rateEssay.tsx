'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function rateEssay(essayId: string, value: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('Korisnik nije prijavljen');
  }

  if (value < 1 || value > 5) {
    throw new Error('Ocena mora biti između 1 i 5');
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

  // Get new average rating and count for essayId
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

  return {
    newAverageRating: essayRatingAverage._avg.value || 0,
    newRatingCount: essayRatingAverage._count.value || 0,
  };
}
