import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategory } from '@/lib/types';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Prisma, SchoolType } from '@prisma/client';
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife, // default for now!
} from 'next/cache';
import { redirect } from 'next/navigation';

// Full podaci o sastavi po ID-u
export async function getEssayById(essayId: string) {
  'use cache';
  cacheTag(`essay-${essayId}`); // Kesiranje pojedinacnih sastava

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

  // Kesiranje po kategoriji (kada se obrise kategorija ili promeni naziv kategorije ovo se revalidira da ne bi ostao u kesu sastav koji ne postoji vise)
  cacheTag(`essay-category-${essay?.categoryId}`);

  if (!essay) {
    console.error(`[getEssayById] No essay found with ID: ${essayId}`); // for developer!
    return null;
  }

  return essay as EssayWithAuthorCategory;
}

// Basic podaci o sastavima
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

export async function getLatestEssays(limit = 5) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)

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
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

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
  sort = 'desc',
) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)
  // cacheTag(`essays-filters-${page}-${schoolType}-${grade}`); // mozda??

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

export async function getUnpublishedEssays() {
  // Samo admin moze da vidi neobjavljene sastave
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) return redirect('/');

  const user = await getUser();
  if (!user) return redirect('/');

  const isAdmin = (await getPermission('admin:access'))?.isGranted;
  if (!isAdmin) return redirect('/');

  const essays = await prisma.essay.findMany({
    where: {
      published: false,
    },
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
  const essay = await prisma.essay.findFirst({
    where: {
      id: essayId,
      authorId: user.id,
    },
  });

  if (!essay) return false;
  return true;
}
