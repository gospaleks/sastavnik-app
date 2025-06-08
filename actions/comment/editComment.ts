'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export const editComment = async (commentId: string, newContent: string) => {
  const { getUser, isAuthenticated, getPermission } = getKindeServerSession();
  const [isLoggedIn, user, isAdmin] = await Promise.all([
    isAuthenticated(),
    getUser(),
    getPermission('admin:access').then((p) => p?.isGranted),
  ]);

  if (!isLoggedIn || !user) {
    return {
      success: false,
      message: 'Morate biti prijavljeni da biste izmenili komentar',
    };
  }
  const comment = await prisma.comment.update({
    where: isAdmin ? { id: commentId } : { id: commentId, authorId: user.id },
    data: {
      content: newContent,
    },
  });

  if (!comment) {
    return {
      success: false,
      message: 'Došlo je do greške prilikom izmene komentara',
    };
  }

  revalidateTag(`essay-${comment.essayId}`);

  return {
    success: true,
    message: 'Komentar je uspešno izmenjen',
  };
};
