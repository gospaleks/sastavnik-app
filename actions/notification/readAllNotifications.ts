'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const readAllNotifications = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const [isLoggedIn, user] = await Promise.all([isAuthenticated(), getUser()]);

  if (!isLoggedIn || !user) {
    return {
      success: false,
      message: 'Morate biti prijavljeni da biste pročitali sve notifikacije',
    };
  }

  // Ažuriranje svih notifikacija korisnika kao pročitane
  await prisma.notification.updateMany({
    where: { userId: user.id, read: false },
    data: { read: true },
  });

  return { success: true, message: 'Sve notifikacije su uspešno pročitane' };
};
