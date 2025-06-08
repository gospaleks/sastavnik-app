import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const requireUser = cache(
  async (redirectUrl: string = '/api/auth/login') => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) redirect(redirectUrl);

    return user;
  },
);
