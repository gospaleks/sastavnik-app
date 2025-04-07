// scripts/initAverageRatings.ts

import { prisma } from '@/lib/prisma';

export default async function updateAverageRatings() {
  const essays = await prisma.essay.findMany({
    include: { ratings: true },
  });

  for (const essay of essays) {
    const ratings = essay.ratings;
    const ratingCount = ratings.length;
    const averageRating =
      ratingCount > 0
        ? ratings.reduce((sum, r) => sum + r.value, 0) / ratingCount
        : 0;

    await prisma.essay.update({
      where: { id: essay.id },
      data: {
        averageRating,
        ratingCount,
      },
    });
  }

  console.log('Prosečne ocene i broj ocena su uspešno postavljeni.');
}
