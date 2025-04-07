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
export async function getEssaysBasicByAuthor(authorId: string) {
  return await prisma.essay.findMany({
    where: {
      authorId: authorId,
    },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
}

export async function getEssaysBasicByCategoryName(categoryName: string) {
  return await prisma.essay.findMany({
    where: {
      category: {
        name: categoryName,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
}

// Full podaci o sastavima po kategoriji (za card prikaz)
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
      ratings: {
        select: {
          value: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!essays) {
    throw new Error('Sastavi nisu pronađeni');
  }

  return essays as EssayWithAuthorCategory[];
}
