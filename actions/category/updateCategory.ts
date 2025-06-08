'use server';

import { prisma } from '@/lib/prisma';
import { CategoryFormSchemaType } from '@/lib/schemas';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export const updateCategory = async (
  categoryId: string,
  values: CategoryFormSchemaType,
): Promise<{
  success: boolean;
  message: string;
}> => {
  const { getPermission } = getKindeServerSession();
  const isAdmin = (await getPermission('admin:access'))?.isGranted;

  if (!isAdmin) {
    return {
      success: false,
      message: 'Nemate dozvolu za izmenu kategorija',
    };
  }

  const { name } = values;

  // Proverava da li kategorija vec postoji
  const existingCategory = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!existingCategory) {
    return {
      success: false,
      message: 'Kategorija koju želite da izmenite nije pronađena',
    };
  }

  // Proverava da li kategorija sa istim imenom vec postoji ()
  const existingCategoryWithSameName = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (existingCategoryWithSameName) {
    return {
      success: false,
      message: 'Kategorija sa istim nazivom već postoji',
    };
  }

  // Izmena kategorije
  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
    },
  });

  revalidateTag('categories'); // Revalidira tag za sve kategorije
  revalidateTag(`essay-category-${updatedCategory.id}`); // Revalidira tag za sve sastave koji su u toj kategoriji\
  revalidateTag('essays'); // Revalidira tag za sve liste

  return {
    success: true,
    message: `Kategorija "${updatedCategory.name}" je uspešno izmenjena`,
  };
};
