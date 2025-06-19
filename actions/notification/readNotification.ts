'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const readNotification = async (notificationId: string) => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const [isLoggedIn, user] = await Promise.all([isAuthenticated(), getUser()]);

  if (!isLoggedIn || !user) {
    return {
      success: false,
      message: 'Morate biti prijavljeni da biste pročitali notifikaciju',
    };
  }

  // Provera da li notifikacija pripada korisniku
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId, userId: user.id },
  });

  if (!notification) {
    return {
      success: false,
      message: 'Notifikacija ne postoji ili nije vaša',
    };
  }

  // Ažuriranje notifikacije kao pročitane
  await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });

  return { success: true, message: 'Notifikacija je uspešno pročitana' };
};
