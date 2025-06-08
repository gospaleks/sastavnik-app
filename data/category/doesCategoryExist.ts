import { prisma } from '@/lib/prisma';
import { unstable_cacheTag as cacheTag } from 'next/cache';

export async function doesCategoryExist(categoryName: string) {
  'use cache';
  cacheTag('categories');

  const category = await prisma.category.findUnique({
    where: {
      name: categoryName,
    },
  });

  return !!category;
}
