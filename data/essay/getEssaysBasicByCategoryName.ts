import { prisma } from '@/lib/prisma';
import { unstable_cacheTag as cacheTag } from 'next/cache';

// Basic podaci o sastavima po kategoriji
export async function getEssaysBasicByCategoryName(
  categoryName: string,
  limit = 10,
) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)

  return await prisma.essay.findMany({
    where: {
      category: {
        name: categoryName,
      },
      published: true,
    },
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
}
