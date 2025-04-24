'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { CategoryFormSchemaType } from '@/lib/schemas';
import { revalidateTag } from 'next/cache';

export default async function createCategory(
  values: CategoryFormSchemaType,
): Promise<{
  success: boolean;
  message: string;
}> {
  const { getPermission } = getKindeServerSession();
  const isAdmin = (await getPermission('admin:access'))?.isGranted;

  if (!isAdmin) {
    return {
      success: false,
      message: 'Nemate dozvolu za dodavanje kategorija',
    };
  }

  const { name } = values;

  // Proverava da li kategorija vec postoji
  const existingCategory = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (existingCategory) {
    return {
      success: false,
      message: 'Kategorija sa istim nazivom već postoji',
    };
  }

  // Kreira novu kategoriju
  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  revalidateTag('categories'); // Revalidira tag za sve kategorije

  return {
    success: true,
    message: `Kategorija "${category.name}" je uspešno dodata`,
  };
}
