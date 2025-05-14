import { prisma } from '@/lib/prisma';
import { UserWithEssays, UserWithNumberOfEssays } from '@/lib/types';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getUserById(userId: string) {
  // TODO: kesiranje preko userId, i onda kad se promeni profil, ili neki sastav korisnika, invalidirati kes, mozda?!?!?!

  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      essays: {
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      favoriteEssays: {
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return userProfile as UserWithEssays;
}

export async function getUsersRatingForEssay(userId: string, essayId: string) {
  'use cache';
  cacheTag(`essay-${essayId}`);

  const rating = await prisma.rating.findFirst({
    where: {
      userId,
      essayId,
    },
    select: {
      value: true,
    },
  });

  return rating;
}

export async function isEssayFavoriteForUser(essayId: string, userId: string) {
  'use cache';
  cacheTag(`essay-favorite-${essayId}`); // Kesiranje pojedinacnih sastava

  return (
    (await prisma.essay.findFirst({
      where: {
        id: essayId,
        favoriteBy: {
          some: { id: userId },
        },
      },
      select: { id: true },
    })) !== null
  );
}

export async function getAllUsers() {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) return redirect('/');

  const user = await getUser();
  if (!user) return redirect('/');

  const isAdmin = (await getPermission('admin:access'))?.isGranted;
  if (!isAdmin) return redirect('/');

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          essays: true,
        },
      },
    },
  });

  return users as UserWithNumberOfEssays[];
}
