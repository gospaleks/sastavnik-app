import { Metadata } from 'next/types';

import { getAllUsers } from '@/data/user/getAllUsers';

import ContentWrapper from '@/components/ContentWrapper';
import UsersList from './UsersList';

export const metadata: Metadata = {
  title: 'Korisnici',
};

const Korisnici = async () => {
  const users = await getAllUsers(); // metoda getAllUsers ima requireAdmin u sebi

  return (
    <ContentWrapper>
      <h1 className="mb-4 text-center text-3xl font-extrabold tracking-tight">
        Korisnici
      </h1>

      <UsersList users={users} />
    </ContentWrapper>
  );
};

export default Korisnici;
