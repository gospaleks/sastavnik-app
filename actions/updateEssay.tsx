'use server';

import { prisma } from '@/lib/prisma';
import { EssayFormSchemaType } from '@/lib/schemas';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export default async function updateEssay(
  essayId: string,
  values: EssayFormSchemaType,
): Promise<{
  success: boolean;
  message: string;
  essayId?: string;
}> {
  // Kinde
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = (await getPermission('admin:access'))?.isGranted;

  if (!user) {
    return {
      success: false,
      message: 'Korisnik nije prijavljen',
    };
  }

  const isUsersEssay = await prisma.essay.findUnique({
    where: {
      id: essayId,
      authorId: user.id,
    },
  });

  // Izmena je moguca samo ako je sastav korisnika ili ako je korisnik admin
  if (!isUsersEssay && !isAdmin) {
    return {
      success: false,
      message: 'Nemate prava da izmenite ovaj sastav',
    };
  }

  // Izmena sastava
  const updatedEssay = await prisma.essay.update({
    where: {
      id: essayId,
    },
    data: {
      title: values.title,
      content: values.content,
      tags: values.tags,
      level: values.level,
      schoolType: values.schoolType,
      categoryId: values.categoryId,
    },
  });

  revalidateTag('essays');

  return {
    success: true,
    message: `Sastav "${updatedEssay.title}" je uspešno izmenjen.`,
    essayId: updatedEssay.id,
  };
}
