'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidateTag } from 'next/cache';

export const createComment = async (
  essayId: string,
  content: string,
  parentId?: string,
) => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const [isLoggedIn, user] = await Promise.all([isAuthenticated(), getUser()]);

  if (!isLoggedIn || !user) {
    return {
      success: false,
      message: 'Morate biti prijavljeni da biste dodali komentar',
    };
  }

  if (parentId) {
    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId },
    });
    if (!parentComment) {
      return {
        success: false,
        message: 'Komentar na koji odgovarate ne postoji',
      };
    }
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      essayId,
      authorId: user.id,
      parentId: parentId ? parentId : null,
    },
  });

  if (!comment) {
    return {
      success: false,
      message: 'Došlo je do greške prilikom dodavanja komentara',
    };
  }

  revalidateTag('essays');
  revalidateTag(`essay-${essayId}`);

  return {
    success: true,
    message: 'Komentar je uspešno dodat',
  };
};
