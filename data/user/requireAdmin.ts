import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const requireAdmin = cache(
  async (redirectUrl: string = '/api/auth/login') => {
    const { getPermission, getUser } = getKindeServerSession();
    const user = await getUser();
    const isAdmin = (await getPermission('admin:access'))?.isGranted;

    if (!isAdmin || !user) redirect(redirectUrl);

    return user;
  },
);
