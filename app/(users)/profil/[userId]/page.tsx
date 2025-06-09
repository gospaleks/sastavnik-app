import Link from 'next/link';
import { Metadata } from 'next';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { getUserById } from '@/data/user/getUserById';

import EssayCardInProfile from './EssayCardInProfile';
import UsersInfo from './UsersInfo';

import ContentWrapper from '@/components/ContentWrapper';
import { Button } from '@/components/ui/button';
import { NotebookTextIcon, PlusCircleIcon, UserIcon } from 'lucide-react';
import Favorites from './Favorites';
import InfoBox from '@/components/InfoBox';
import { getUserSession } from '@/data/user/getUser';

type PageProps = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { userId } = await params;
  const userData = await getUserById(userId);

  return {
    title: `Profil - ${userData?.firstName} ${userData?.lastName}`,
    description: `Profil korisnika ${userData?.firstName} ${userData?.lastName}. Prikaz njegovih sastava i informacija.`,
  };
}

const ProfilPage = async ({ params }: PageProps) => {
  // Extract userId from params
  const { userId } = await params;

  // Parallelize fetching user data and session info
  const [userData, user, { getPermission }] = await Promise.all([
    getUserById(userId),
    getUserSession(),
    getKindeServerSession(),
  ]);

  const usersEssays = userData?.essays || [];

  // Check admin permission in parallel
  const isAdmin = (await getPermission('admin:access'))?.isGranted;

  // Determine if the user can edit
  const canEdit = user && (userId === user.id || isAdmin);

  // Filter essays based on published status
  const filteredEssays = canEdit
    ? usersEssays
    : usersEssays.filter((essay) => essay.published);

  return (
    <ContentWrapper>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        {/** Leva strana - prikaz svih sastava korisnika */}
        <div className="w-full md:w-8/12">
          <div className="bg-accent mb-4 flex w-full items-center justify-between gap-2 rounded-lg border px-4 py-2 text-sm sm:text-lg">
            <div className="flex items-center gap-2">
              <NotebookTextIcon />
              <span>Sastavi korisnika ({filteredEssays.length})</span>
            </div>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {filteredEssays.length > 0 ? (
              filteredEssays.map((essay) => (
                <EssayCardInProfile
                  key={essay.id}
                  essay={essay}
                  canEdit={canEdit}
                  isAdmin={isAdmin}
                />
              ))
            ) : (
              <div className="mb-2">
                <InfoBox message="Korisnik još nema sastava za prikaz." />
                {canEdit && (
                  <div className="flex w-full items-center justify-center p-4">
                    <Button variant={'default'} asChild>
                      <Link href={`/dodaj-sastav`}>
                        <PlusCircleIcon />
                        Dodaj sastav
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/** Desna strana - prikaz podataka o korisniku */}
        <div className="flex w-full flex-col gap-4 md:w-4/12">
          <div className="bg-accent text-md flex w-full items-center gap-2 rounded-lg border px-4 py-2 sm:text-lg">
            <UserIcon />
            <span>O korisniku</span>
          </div>

          <UsersInfo userData={userData} canEdit={canEdit} />

          {/** Prikaz omiljenih sastava (korisnik ili admin moze da vidi) */}
          {canEdit && (
            <Favorites userId={userId} essays={userData.favoriteEssays} />
          )}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ProfilPage;
