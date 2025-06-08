'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export default async function deleteEssay(essayId: string) {
  // Kinde
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = (await getPermission('admin:access'))?.isGranted;

  if (!user) {
    throw new Error('Korisnik nije prijavljen');
  }

  const isUsersEssay = await prisma.essay.findUnique({
    where: {
      id: essayId,
      authorId: user.id,
    },
  });

  // Brisanje je moguce samo ako je sastav korisnika ili ako je korisnik admin
  if (!isUsersEssay && !isAdmin) {
    throw new Error('Nemate prava da obrišete ovaj sastav');
  }

  // Brisanje sastava
  const deletedEssay = await prisma.essay.delete({
    where: {
      id: essayId,
    },
  });

  revalidateTag('essays');
  revalidateTag(`essay-${deletedEssay.id}`);
  revalidateTag(`user-${deletedEssay.authorId}`);

  return {
    message: `Sastav "${deletedEssay.title}" je uspešno obrisan.`,
  };
}
