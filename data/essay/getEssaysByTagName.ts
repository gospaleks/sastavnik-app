import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategory } from '@/lib/types';
import { unstable_cacheTag as cacheTag } from 'next/cache';

// Full podaci o sastavima po tag-u (za card prikaz u /tag/tagName)
export async function getEssaysByTagName(tagName: string) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)

  const essays = await prisma.essay.findMany({
    where: {
      tags: {
        has: tagName,
      },
      published: true,
    },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      category: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return essays as EssayWithAuthorCategory[];
}
