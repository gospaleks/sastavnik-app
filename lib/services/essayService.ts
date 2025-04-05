import { prisma } from '@/lib/prisma';

export async function getEssayByCategoryName(categoryName: string) {
  return await prisma.essay.findMany({
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
  });
}
