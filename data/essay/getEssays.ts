import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategory } from '@/lib/types';
import { Prisma, SchoolType } from '@prisma/client';
import { unstable_cacheTag as cacheTag } from 'next/cache';

// Full podaci o sastavima sortirani po datumj (za rutu '/sastavi')
// Na stranici uvek idu po 10 sastava, pa je limit 10 a offset se menja u zavisnosti od stranice
export async function getEssays(
  page = 1,
  searchTerm = '',
  schoolType = '',
  grade = '',
  sort = 'desc',
) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)
  // cacheTag(`essays-filters-${page}-${schoolType}-${grade}`); // mozda??

  const limit = 6;
  const offset = (page - 1) * limit;

  const whereClause: Prisma.EssayWhereInput = {
    published: true,
    ...(searchTerm && {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          content: {
            contains: searchTerm,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          tags: {
            has: searchTerm,
          },
        },
        {
          author: {
            OR: [
              {
                firstName: {
                  contains: searchTerm,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                lastName: {
                  contains: searchTerm,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          },
        },
      ],
    }),
    ...(schoolType && {
      schoolType: schoolType as SchoolType,
    }),
    ...(grade && {
      level: parseInt(grade),
    }),
  };

  const essays = await prisma.essay.findMany({
    take: limit,
    skip: offset,
    where: whereClause,
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
