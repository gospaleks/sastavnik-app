import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function isAdmin() {
  const { getPermission, isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) return false;

  const isAdminAccessGranted = (await getPermission('admin:access'))?.isGranted;

  return isAdminAccessGranted;
}
