import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategoryRating } from '@/lib/types';

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

export async function getEssaysBasicByAuthor(
  authorId: string,
  essaySkipId: string,
) {
  return await prisma.essay.findMany({
    where: {
      authorId: authorId,
      id: {
        not: essaySkipId,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
}

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
