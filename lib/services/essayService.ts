import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategoryRating } from '@/lib/types';

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
      ratings: {
        select: {
          value: true,
        },
      },
    },
  });

  if (!essay) {
    throw new Error('Sastav nije pronađen');
  }

  const ratingCount = essay.ratings.length;
  const ratingValues = essay.ratings.map((r) => r.value);
  const avgRating =
    ratingValues.length > 0
      ? ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length
      : null;

  return {
    ...essay,
    averageRating: avgRating,
    ratingCount: ratingCount,
  } as EssayWithAuthorCategoryRating;
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

  const essaysWithAvgRating = essays.map((essay) => {
    const ratingCount = essay.ratings.length;
    const ratingValues = essay.ratings.map((r) => r.value);
    const avgRating =
      ratingValues.length > 0
        ? ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length
        : null;

    return {
      ...essay,
      averageRating: avgRating,
      ratingCount: ratingCount,
    } as EssayWithAuthorCategoryRating;
  });

  return essaysWithAvgRating;
}
