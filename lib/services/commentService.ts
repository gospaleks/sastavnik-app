import { prisma } from '@/lib/prisma';
import { EssayWithComments } from '../types';

export async function getAllComments() {
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
