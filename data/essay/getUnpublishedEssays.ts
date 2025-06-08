import { prisma } from '@/lib/prisma';
import { EssayWithAuthorCategory } from '@/lib/types';
import { requireAdmin } from '@/data/user/requireAdmin';

export async function getUnpublishedEssays() {
  // Samo admin moze da vidi neobjavljene sastave
  await requireAdmin('/');

  const essays = await prisma.essay.findMany({
    where: {
      published: false,
    },
    include: {
      category: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return essays as EssayWithAuthorCategory[];
}
