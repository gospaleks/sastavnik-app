import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategory } from '@/lib/types';

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

  if (!essay) {
    throw new Error('Sastav nije pronađen');
  }

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

// Full podaci o sastavima po kategoriji (za card prikaz u /kategorija/categoryName)
export async function getEssaysByCategoryName(categoryName: string) {
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

  if (!essays) {
    throw new Error('Sastavi nisu pronađeni');
  }

  // TODO: Paginacija!
  // TODO: Dodati use cache i tag-ovanje za invalidaciju cache-a prilikom dodavanja novih sastava koji su u istoj kategoriji

  return essays as EssayWithAuthorCategory[];
}

// Full podaci o sastavima sortirani po popularnosti (za home page prikaz u card-ovima)
export async function getEssaysByPopularity(limit = 10) {
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

  if (!essays) {
    throw new Error('Sastavi nisu pronađeni');
  }

  return essays as EssayWithAuthorCategory[];
}
