import { prisma } from '@/lib/prisma';
import { unstable_cacheTag as cacheTag } from 'next/cache';

export async function isEssayFavoriteForUser(essayId: string, userId: string) {
  'use cache';
  cacheTag(`essay-favorite-${essayId}`); // Kesiranje pojedinacnih sastava

  return (
    (await prisma.essay.findFirst({
      where: {
        id: essayId,
        favoriteBy: {
          some: { id: userId },
        },
      },
      select: { id: true },
    })) !== null
  );
}
