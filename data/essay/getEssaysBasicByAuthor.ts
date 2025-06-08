import { prisma } from '@/lib/prisma';
import { unstable_cacheTag as cacheTag } from 'next/cache';

// Basic podaci o sastavima autora
export async function getEssaysBasicByAuthor(authorId: string, limit = 10) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)

  return await prisma.essay.findMany({
    where: {
      authorId: authorId,
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
