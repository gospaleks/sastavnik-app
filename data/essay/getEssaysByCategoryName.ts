import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategory } from '@/lib/types';
import { Prisma } from '@prisma/client';
import { unstable_cacheTag as cacheTag } from 'next/cache';

// Full podaci o sastavima po kategoriji (za card prikaz u /kategorija/categoryName)
export async function getEssaysByCategoryName(
  categoryName: string,
  page = 1,
  sort = 'desc',
) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)
  // cacheTag(`category-${categoryName}`); // Kesiranje po kategoriji mozda???

  const limit = 8;
  const offset = (page - 1) * limit;

  const whereClause: Prisma.EssayWhereInput = {
    published: true,
    category: {
      name: categoryName,
    },
  };

  const essays = await prisma.essay.findMany({
    where: whereClause,
    take: limit,
    skip: offset,
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
      createdAt: sort === 'asc' ? 'asc' : 'desc',
    },
  });

  const total = await prisma.essay.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    essays: essays as EssayWithAuthorCategory[],
    totalEssays: total,
    totalPages,
  };
}
