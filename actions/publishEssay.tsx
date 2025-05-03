'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export default async function publishEssay(essayId: string) {
  const { getPermission } = getKindeServerSession();
  const isAdmin = (await getPermission('admin:access'))?.isGranted;

  if (!isAdmin) {
    throw new Error('Nemate dozvolu za objavljivanje sastava');
  }

  // Proverava da li sastav postoji
  const existingEssay = await prisma.essay.findUnique({
    where: {
      id: essayId,
    },
  });

  if (!existingEssay) {
    throw new Error('Sastav koji želite da objavite nije pronađen');
  }

  // Proverava da li je sastav već objavljen
  if (existingEssay.published) {
    throw new Error('Sastav je već objavljen');
  }

  // Objavljuje sastav
  const publishedEssay = await prisma.essay.update({
    where: {
      id: essayId,
    },
    data: {
      published: true,
    },
  });

  revalidateTag('essays'); // Revalidira tag za sve sastave
  revalidateTag(`essay-${publishedEssay.id}`); // Revalidira tag za taj sastav

  return {
    message: `Sastav "${publishedEssay.title}" je uspešno objavljen.`,
  };
}
