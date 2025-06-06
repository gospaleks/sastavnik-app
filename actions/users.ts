'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';

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

  revalidatePath(`/users/${userId}`);

  return {
    success: true,
    message: 'Profil je uspešno izmenjen',
  };
}

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

  revalidatePath(`/users/${userId}`);

  return {
    success: true,
    message: 'Linkovi ka društvenim mrežama su uspešno izmenjeni',
  };
};

export const deleteUser = async (userId: string) => {
  const { getUser, isAuthenticated, getPermission } = getKindeServerSession();
  const [isLoggedIn, user, isAdmin] = await Promise.all([
    isAuthenticated(),
    getUser(),
    getPermission('admin:access').then((p) => p?.isGranted),
  ]);

  if (!isLoggedIn || !user) {
    throw new Error('Morate biti prijavljeni da biste obrisali korisnika');
  }

  if (!isAdmin) {
    throw new Error('Nemate dozvolu da obrišete korisnika');
  }

  const userToDelete = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userToDelete) {
    throw new Error('Korisnik ne postoji');
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath('/admin/korisnici');

  return {
    message: `Korisnik ${userToDelete.email} je uspešno obrisan`,
  };
};
