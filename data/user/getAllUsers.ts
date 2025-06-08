import { prisma } from '@/lib/prisma';
import { UserWithNumberOfEssays } from '@/lib/types';
import { requireAdmin } from './requireAdmin';

export async function getAllUsers() {
  await requireAdmin('/');

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
