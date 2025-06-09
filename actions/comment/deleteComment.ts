'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export const deleteComment = async (commentId: string) => {
  const { getUser, isAuthenticated, getPermission } = getKindeServerSession();
  const [isLoggedIn, user, isAdmin] = await Promise.all([
    isAuthenticated(),
    getUser(),
    getPermission('admin:access').then((p) => p?.isGranted),
  ]);

  if (!isLoggedIn || !user) {
    return {
      success: false,
      message: 'Morate biti prijavljeni da biste obrisali komentar',
    };
  }

  const comment = await prisma.comment.delete({
    where: isAdmin ? { id: commentId } : { id: commentId, authorId: user.id },
  });

  if (!comment) {
    return {
      success: false,
      message: 'Došlo je do greške prilikom brisanja komentara',
    };
  }

  revalidateTag('essays');
  revalidateTag(`essay-${comment.essayId}`);

  return {
    success: true,
    message: 'Komentar je uspešno obrisan',
  };
};
