import { Metadata } from 'next/types';
import { redirect } from 'next/navigation';

import ContentWrapper from '@/components/ContentWrapper';
import { isAdmin } from '../isAdmin';
import { getAllUsers } from '@/lib/services/userService';
import UsersList from './UsersList';

export const metadata: Metadata = {
  title: 'Korisnici',
};

const Korisnici = async () => {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) redirect('/');

  const users = await getAllUsers();

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
