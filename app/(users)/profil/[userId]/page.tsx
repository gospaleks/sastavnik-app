import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import ContentWrapper from '@/components/ContentWrapper';
import { getUserById } from '@/lib/services/userService';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const userData = await getUserById(userId);

  return {
    title: `Profil - ${userData?.firstName} ${userData?.lastName}`,
  };
}

export const ProfilPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  // User's data
  const { userId } = await params;
  const userData = await getUserById(userId);

  // Kinde
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  const isUsersProfile = isLoggedIn && userId === user.id;

  return (
    <ContentWrapper>
      <p>
        {isUsersProfile
          ? 'Ovo je tvoj profil'
          : `Profil korisnika ${userData?.firstName} ${userData?.lastName}`}
      </p>
    </ContentWrapper>
  );
};

export default ProfilPage;
