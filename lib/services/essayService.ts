import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategory } from '@/lib/types';
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
export async function getEssays(page = 1) {
  'use cache';
  cacheTag('essays'); // Invalidiraj pri promeni filtera ili pretrage ili stranice

  const limit = 4; // Broj sastava po stranici
  const offset = (page - 1) * limit; // Offset za paginaciju

  const essays = await prisma.essay.findMany({
    take: limit,
    skip: offset,
    where: {
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

  const total = await prisma.essay.count({
    where: {
      published: true,
    },
  });

  const totalPages = Math.ceil(total / limit); // Ukupan broj stranica

  return {
    essays: essays as EssayWithAuthorCategory[],
    totalEssays: total,
    totalPages,
  };
}
