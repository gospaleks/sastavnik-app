import { prisma } from '@/lib/prisma';
import { unstable_cacheTag as cacheTag } from 'next/cache';

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
