import { prisma } from '@/lib/prisma';
import { unstable_cacheTag as cacheTag } from 'next/cache';

export async function getAllCategories() {
  'use cache'; // try new use cache function from nextjs 15
  cacheTag('categories'); // Kad se u admin panelu doda nova kategorija u server action pozovi revalidateTag('categories')

  const categories = await prisma.category.findMany();
  if (!categories) {
    throw new Error('Kategorije nisu pronađene');
  }

  return categories;
}

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
