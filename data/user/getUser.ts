import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { cache } from 'react';

export const getUserSession = cache(async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user;
});
