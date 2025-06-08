'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export const updateUsersSocialLinks = async (
  userId: string,
  facebookUrl: string,
  instagramUrl: string,
) => {
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

  // Izmena socijalnih linkova
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      facebook: facebookUrl || null,
      instagram: instagramUrl || null,
    },
  });

  revalidateTag(`user-${userId}`); // Revalidira tag za korisnika

  return {
    success: true,
    message: 'Linkovi ka društvenim mrežama su uspešno izmenjeni',
  };
};
