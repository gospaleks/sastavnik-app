'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath, revalidateTag } from 'next/cache';

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
