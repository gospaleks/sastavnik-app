import { prisma } from '@/lib/prisma';
import { EssayWithComments } from '@/lib/types';
import { requireAdmin } from '../user/requireAdmin';

export async function getAllComments() {
  await requireAdmin('/');

  const essaysWithComments = await prisma.essay.findMany({
    where: {
      comments: {
        some: {},
      },
    },
    select: {
      id: true,
      title: true,
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          content: true,
          parent: true,
          parentId: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return essaysWithComments as EssayWithComments[];
}
