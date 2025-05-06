'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export default async function tooglePublishEssay(
  essayId: string,
  isPublished = true, // Ako je true, objavljuje sastav, ako je false, sakriva ga
) {
  const { getPermission } = getKindeServerSession();
  const isAdmin = (await getPermission('admin:access'))?.isGranted;

  if (!isAdmin) {
    throw new Error('Nemate dozvolu za ovu operaciju');
  }

  // Proverava da li sastav postoji
  const existingEssay = await prisma.essay.findUnique({
    where: {
      id: essayId,
    },
  });

  if (!existingEssay) {
    throw new Error('Sastav nije pronađen');
  }

  // Postavlje published na true ili false
  const publishedEssay = await prisma.essay.update({
    where: {
      id: essayId,
    },
    data: {
      published: isPublished,
    },
  });

  revalidateTag('essays'); // Revalidira tag za sve sastave
  revalidateTag(`essay-${publishedEssay.id}`); // Revalidira tag za taj sastav

  return {
    message: `Sastav "${publishedEssay.title}" je uspešno ${isPublished ? 'objavljen' : 'sakriven'}.`,
  };
}
