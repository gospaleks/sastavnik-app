import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategory } from '@/lib/types';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Prisma, SchoolType } from '@prisma/client';
import { unstable_cacheTag as cacheTag } from 'next/cache';

// Full podaci o sastavi po ID-u
export async function getEssayById(essayId: string) {
  const essay = await prisma.essay.findUnique({
    where: {
      id: essayId,
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
    },
  });

  return essay as EssayWithAuthorCategory;
}

// Basic podaci o sastavima
export async function getEssaysBasicByAuthor(authorId: string, limit = 10) {
  return await prisma.essay.findMany({
    where: {
      authorId: authorId,
    },
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
}

export async function getEssaysBasicByCategoryName(
  categoryName: string,
  limit = 10,
) {
  return await prisma.essay.findMany({
    where: {
      category: {
        name: categoryName,
      },
    },
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
}

export async function getLatestEssays(limit = 5) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)
  cacheTag(`latest-essays-${limit}`);

  return await prisma.essay.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
}

// Full podaci o sastavima po kategoriji (za card prikaz u /kategorija/categoryName)
export async function getEssaysByCategoryName(categoryName: string) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)
  cacheTag(`essays-by-category-${categoryName}`); // Kad se doda novi sastav u kategoriji invalidiraj ovaj tag

  const essays = await prisma.essay.findMany({
    where: {
      category: {
        name: categoryName,
      },
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
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // TODO: Paginacija!

  return essays as EssayWithAuthorCategory[];
}

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
    },
  });

  return essays as EssayWithAuthorCategory[];
}

// Full podaci o sastavima sortirani po datumj (za rutu '/sastavi')
// Na stranici uvek idu po 10 sastava, pa je limit 10 a offset se menja u zavisnosti od stranice
export async function getEssays(
  page = 1,
  searchTerm = '',
  schoolType = '',
  grade = '',
) {
  'use cache';

  const tagKey = `essays-${[
    page,
    encodeURIComponent(searchTerm),
    encodeURIComponent(schoolType),
    encodeURIComponent(grade),
  ].join('-')}`;

  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)
  cacheTag(tagKey); // Tag za specificne filtere

  // console.log('[getEssays]', { page, searchTerm, schoolType, grade });

  const limit = 4;
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
    },
    orderBy: {
      createdAt: 'desc',
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

// Da li je sastav pripada logovanom korisniku ili je korisnik admin
export async function canEditEssay(essayId: string) {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) return false;

  const user = await getUser();
  if (!user) return false;

  // Ako je admin moze
  const isAdmin = (await getPermission('admin:access'))?.isGranted;
  if (isAdmin) return true;

  // Ako nije admin, proveri da li je autor sastava
  return await prisma.essay.findFirst({
    where: {
      id: essayId,
      authorId: user.id,
    },
  });
}
