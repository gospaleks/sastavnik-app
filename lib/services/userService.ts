import { prisma } from '@/lib/prisma';

// TODO: Vrati odgovarajuce podatke za korisnika
export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      essays: true,
    },
  });
}
