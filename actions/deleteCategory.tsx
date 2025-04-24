'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export default async function deleteCategory(categoryId: string) {
  const { getPermission } = getKindeServerSession();
  const isAdmin = (await getPermission('admin:access'))?.isGranted;

  if (!isAdmin) {
    throw new Error('Nemate dozvolu za brisanje kategorija');
  }

  // Proverava da li kategorija postoji
  const existingCategory = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!existingCategory) {
    throw new Error('Kategorija koju želite da obrišete nije pronađena');
  }

  // Broj sastava u kategoriji
  const essaysCount = await prisma.essay.count({
    where: {
      categoryId: categoryId,
    },
  });

  // Brisanje kategorije
  const deletedCategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  revalidateTag('categories'); // Revalidira tag za sve kategorije
  revalidateTag(`essay-category-${deletedCategory.id}`); // Revalidira tag za sve sastave koji su u toj kategoriji

  return {
    message: `Kategorija "${deletedCategory.name}" je uspešno obrisana. Obrisano je ${essaysCount} sastava.
    `,
  };
}
