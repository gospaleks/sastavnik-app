import { prisma } from '@/lib/prisma';
import { UserWithEssays } from '@/lib/types';
import { unstable_cacheTag as cacheTag } from 'next/cache';

export async function getUserById(userId: string) {
  // TODO: kesiranje preko userId, i onda kad se promeni profil, ili neki sastav korisnika, invalidirati kes, mozda?!?!?!

  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      essays: {
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return userProfile as UserWithEssays;
}

export async function getUsersRatingForEssay(userId: string, essayId: string) {
  'use cache';
  cacheTag(`essay-${essayId}`);

  const rating = await prisma.rating.findFirst({
    where: {
      userId,
      essayId,
    },
    select: {
      value: true,
    },
  });

  return rating;
}
