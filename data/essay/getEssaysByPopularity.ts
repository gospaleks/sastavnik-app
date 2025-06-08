import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategory } from '@/lib/types';
import { unstable_cacheTag as cacheTag } from 'next/cache';

// Full podaci o sastavima sortirani po popularnosti (za home page prikaz u card-ovima)
export async function getEssaysByPopularity(limit = 10) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)

  const essays = await prisma.essay.findMany({
    where: {
      published: true,
    },
    orderBy: {
      averageRating: 'desc',
    },
    take: limit,
    include: {
      category: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return essays as EssayWithAuthorCategory[];
}
