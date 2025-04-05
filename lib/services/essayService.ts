import { prisma } from '@/lib/prisma';

export async function getEssayByCategoryName(categoryName: string) {
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
  });

  const essaysWithAvgRating = essays.map((essay) => {
    const ratingValues = essay.ratings.map((r) => r.value);
    const avgRating =
      ratingValues.length > 0
        ? ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length
        : null;

    return {
      ...essay,
      averageRating: avgRating,
    };
  });

  return essaysWithAvgRating;
}
