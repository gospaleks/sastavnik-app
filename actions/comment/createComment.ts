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

  // Cuvanje komentara
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

  // Notifikacije

  // Autor sastava na kojem se dodaje komentar
  const essayAuthor = await prisma.essay.findUnique({
    where: { id: essayId },
    select: { authorId: true },
  });

  // 1. Notifikacija autoru eseja (ako je top level komentar)
  if (!parentId && essayAuthor && essayAuthor.authorId !== user.id) {
    await prisma.notification.create({
      data: {
        userId: essayAuthor.authorId,
        message: `Novi komentar na vaš sastav: "${comment.content.slice(0, 50)}..."`,
        href: `/sastavi/${essayId}`, // TODO: add link to the specific comment if needed #commentID-${comment.id}`
      },
    });
  }

  // 2. Notifikacija autoru komentara na koji se odgovara
  if (parentId) {
    const parentCommentAuthor = await prisma.comment.findUnique({
      where: { id: parentId },
      select: { authorId: true },
    });

    if (parentCommentAuthor && parentCommentAuthor.authorId !== user.id) {
      await prisma.notification.create({
        data: {
          userId: parentCommentAuthor.authorId,
          message: `Novi odgovor na vaš komentar: "${comment.content.slice(0, 50)}..."`,
          href: `/sastavi/${essayId}`, // TODO: add link to the specific comment if needed #commentID-${comment.id}`
        },
      });
    }
  }

  revalidateTag('essays');
  revalidateTag(`essay-${essayId}`);

  return {
    success: true,
    message: 'Komentar je uspešno dodat',
  };
};
