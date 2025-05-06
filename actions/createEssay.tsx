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
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  const { title, content, tags, categoryId, schoolType, level } = values;
  let essay;

  if (isLoggedIn) {
    // Kreiranje sastava za prijavljenog korisnika
    essay = await prisma.essay.create({
      data: {
        title,
        content,
        tags,
        categoryId,
        schoolType,
        level,
        authorId: user.id,
        published: true,
      },
    });
  } else {
    // Pribavi anonimnog korisnika
    const anonUser = await prisma.user.findUnique({
      where: {
        email: 'anonimni korisnik',
      },
      select: {
        id: true,
      },
    });

    if (!anonUser) {
      return {
        success: false,
        message: 'Došlo je do greške prilikom dodavanja sastava',
      };
    }

    // Kreiraj sastav kao anonimni korisnik
    essay = await prisma.essay.create({
      data: {
        title,
        content,
        tags,
        categoryId,
        schoolType,
        level,
        authorId: anonUser.id,
        published: false,
      },
    });
  }

  if (!essay) {
    return {
      success: false,
      message: 'Došlo je do greške prilikom dodavanja sastava',
    };
  }

  revalidateTag('essays');

  return {
    success: true,
    message: isLoggedIn
      ? 'Sastav je uspešno dodat.'
      : 'Hvala Vam na dodavanju sastava. Vaš sastav će biti pregledan pre objavljivanja.',
    essayId: essay.id,
  };
}
