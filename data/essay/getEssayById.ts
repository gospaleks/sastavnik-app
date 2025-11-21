import { prisma } from '@/lib/prisma';
import { EssayById } from '@/lib/types';

import { unstable_cacheTag as cacheTag } from 'next/cache';

// Full podaci o sastavi po ID-u
export async function getEssayById(essayId: string) {
  'use cache';
  cacheTag(`essay-${essayId}`); // Kesiranje pojedinacnih sastava

  const essay = await prisma.essay.findUnique({
    where: {
      id: essayId,
    },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          image: true,
        },
      },
      category: true,
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

  // Kesiranje po kategoriji (kada se obrise kategorija ili promeni naziv kategorije ovo se revalidira da ne bi ostao u kesu sastav koji ne postoji vise)
  cacheTag(`essay-category-${essay?.categoryId}`);

  if (!essay) {
    console.error(`[getEssayById] No essay found with ID: ${essayId}`); // for developer!
    return null;
  }

  return essay as EssayById;
}
