'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export default async function toggleFavorite(essayId: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  if (!isLoggedIn) {
    return {
      success: false,
      message: 'Morate biti prijavljeni da biste dodali sastav u omiljene',
    };
  }

  const userInfo = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      favoriteEssays: {
        where: { id: essayId },
        select: { id: true },
      },
    },
  });

  if (!userInfo) {
    return {
      success: false,
      message: 'Nepostojeći korisnik',
    };
  }

  const isFavorite = userInfo?.favoriteEssays.length > 0;

  if (isFavorite) {
    // Ukloni sastav iz omiljenih
    await prisma.user.update({
      where: { id: user.id },
      data: {
        favoriteEssays: {
          disconnect: { id: essayId },
        },
      },
    });

    revalidateTag(`essay-favorite-${essayId}`); // Revalidiraj keš za taj sastav
    revalidateTag(`user-${user.id}`); // Revalidiraj keš za korisnika

    return {
      success: true,
      message: 'Sastav je uklonjen iz omiljenih',
    };
  } else {
    // Dodaj sastav u omiljene
    await prisma.user.update({
      where: { id: user.id },
      data: {
        favoriteEssays: {
          connect: { id: essayId },
        },
      },
    });

    revalidateTag(`essay-favorite-${essayId}`); // Revalidiraj keš za taj sastav
    revalidateTag(`user-${user.id}`); // Revalidiraj keš za korisnika

    return {
      success: true,
      message: 'Sastav je dodat u omiljene',
    };
  }
}
