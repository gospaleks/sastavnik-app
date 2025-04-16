'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

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

  // Proveri da li je newBio isti kao stari bio
  const isBioChanged = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      bio: true,
    },
  });

  if (isBioChanged?.bio === newBio) {
    return {
      success: false,
      message: 'Promenite opis pre čuvanja',
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

  return {
    success: true,
    message: 'Profil je uspešno izmenjen',
  };
}
