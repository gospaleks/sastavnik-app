'use server';

import { prisma } from '@/lib/prisma';
import { EssayFormSchemaType } from '@/lib/schemas';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export default async function createEssay(
  values: EssayFormSchemaType,
): Promise<{
  success: boolean;
  message: string;
  essayId?: string;
}> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return {
      success: false,
      message: 'Korisnik nije prijavljen',
    };
  }

  const { title, content, tags, categoryId, schoolType, level } = values;
  const essay = await prisma.essay.create({
    data: {
      title,
      content,
      tags,
      categoryId,
      schoolType,
      level,
      authorId: user.id,
    },
  });

  if (!essay) {
    return {
      success: false,
      message: 'Došlo je do greške prilikom dodavanja sastava',
    };
  }

  revalidateTag('essays');

  return {
    success: true,
    message: 'Sastav je uspešno dodat',
    essayId: essay.id,
  };
}
