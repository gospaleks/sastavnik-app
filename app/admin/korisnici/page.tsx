import { Metadata } from 'next/types';
import { redirect } from 'next/navigation';

import ContentWrapper from '@/components/ContentWrapper';
import { isAdmin } from '../isAdmin';

export const metadata: Metadata = {
  title: 'Korisnici',
};

const Korisnici = async () => {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) redirect('/');

  return <ContentWrapper>Korisnici...</ContentWrapper>;
};

export default Korisnici;
