import { prisma } from '@/lib/prisma';
import { unstable_cacheTag } from 'next/cache';

export async function getAllCategories() {
  'use cache'; // try new use cache function from nextjs 15
  console.log('Fetching all categories from the database...');

  const categories = await prisma.category.findMany();
  if (!categories) {
    throw new Error('Kategorije nisu pronađene');
  }

  unstable_cacheTag('categories'); // Kad se u admin panelu dodaju nove kategorije ovde se invalidira cache

  return categories;
}
