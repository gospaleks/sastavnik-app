import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Notification } from '@prisma/client';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { BellIcon, Loader2Icon } from 'lucide-react';
import { readAllNotifications } from '@/actions/notification/readAllNotifications';
import { formatRelativeTime } from '@/lib/utils';
import { readNotification } from '@/actions/notification/readNotification';

type Props = {
  user: KindeUser<Record<string, any>>;
};

const Notifications = ({ user }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isReadAllPending, setIsReadAllPending] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    if (isPopoverOpen) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/notifications/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    setIsReadAllPending(true);
    const response = await readAllNotifications();
    setIsReadAllPending(false);

    if (!response.success) {
      console.error(response.message);
      return;
    }

    // Update the notifications state to mark all as read
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const handleMarkAsRead = async (notificationId: string) => {
    setIsPopoverOpen(false);

    const response = await readNotification(notificationId);

    if (!response.success) {
      console.error(response.message);
      return;
    }

    // Update the specific notification as read
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger className="relative" onClick={fetchNotifications}>
        <BellIcon />
        {notifications.filter((n) => !n.read).length > 0 && !isLoading && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="min-h-32">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2Icon className="text-muted-foreground animate-spin" />
            </div>
          ) : notifications.length > 0 ? (
            <>
              <div className="flex max-h-80 flex-col gap-2 overflow-y-auto">
                {notifications.map((notification) => (
                  <Link
                    onClick={() => handleMarkAsRead(notification.id)}
                    href={notification.href ? notification.href : '#'}
                    key={notification.id}
                    className={`rounded-md border p-3 ${
                      notification.read
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-background'
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-muted-foreground ml-auto text-xs">
                        {formatRelativeTime(new Date(notification.createdAt))}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Oznaci sve kao procitano */}
              <Button
                variant={'ghost'}
                className="mt-4 w-full"
                disabled={
                  isReadAllPending || notifications.every((n) => n.read)
                }
                onClick={handleMarkAllAsRead}
              >
                {isReadAllPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  'Označi sve kao pročitano'
                )}
              </Button>
            </>
          ) : (
            <div className="text-muted-foreground flex h-32 w-full items-center justify-center text-center">
              Nema novih notifikacija
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
