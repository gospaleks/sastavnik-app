import Link from 'next/link';
import { Metadata } from 'next';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { getUserById } from '@/lib/services/userService';

import EssayCardInProfile from './EssayCardInProfile';
import UsersInfo from './UsersInfo';

import ContentWrapper from '@/components/ContentWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  NotebookTextIcon,
  PlusCircleIcon,
  PlusIcon,
  UserIcon,
} from 'lucide-react';
import Favorites from './Favorites';
import InfoBox from '@/components/InfoBox';

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
  };
}

const ProfilPage = async ({ params }: PageProps) => {
  // User's data
  const { userId } = await params;
  const userData = await getUserById(userId);
  const usersEssays = userData?.essays || [];

  // Kinde
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();
  const isAdmin = (await getPermission('admin:access'))?.isGranted;

  // Korisnik moze da uredjuje profil ako je njegov ili ako je admin
  const canEdit = isLoggedIn && (userId === user.id || isAdmin);

  // Filtriranje na osnovu published statusa
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
