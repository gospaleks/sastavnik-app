import { requireUser } from '@/data/user/requireUser';
import { prisma } from '@/lib/prisma';

export async function getUserNotifications(userId: string) {
  const user = await requireUser();

  if (user.id !== userId) {
    throw new Error('Nemate pristup korisnikovim notifikacijama');
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: 'desc' },
  });

  return notifications;
}
