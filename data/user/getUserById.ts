import { prisma } from '@/lib/prisma';
import { UserWithEssays } from '@/lib/types';
import { unstable_cacheTag as cacheTag } from 'next/cache';

export async function getUserById(userId: string) {
  'use cache';
  cacheTag(`user-${userId}`);

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
      favoriteEssays: {
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
