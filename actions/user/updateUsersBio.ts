'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export default async function updateUsersBio(userId: string, newBio: string) {
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

  // Izmena je moguca samo ako je korisnik admin ili ako je njegov profil
  if (!isAdmin && userId !== user.id) {
    return {
      success: false,
      message: 'Nemate prava da izmenite ovaj profil',
    };
  }

  // Izmena biografije
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      bio: newBio,
    },
  });

  revalidateTag(`user-${userId}`); // Revalidira tag za korisnika

  return {
    success: true,
    message: 'Profil je uspešno izmenjen',
  };
}
