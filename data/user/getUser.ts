import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const getUserSession = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user;
};
