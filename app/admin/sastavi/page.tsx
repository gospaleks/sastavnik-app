import { redirect } from 'next/navigation';
import { Metadata } from 'next/types';

import { getUnpublishedEssays } from '@/lib/services/essayService';
import { isAdmin } from '../isAdmin';

import ContentWrapper from '@/components/ContentWrapper';
import UnpublishedEssayList from './UnpublishedEssayList';

export const metadata: Metadata = {
  title: 'Neobjavljeni sastavi',
};

const UnpublishedEssaysPage = async () => {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) redirect('/');

  const unpublishedEssays = await getUnpublishedEssays();

  return (
    <ContentWrapper>
      <h1 className="mb-4 text-center text-3xl font-extrabold tracking-tight">
        Neobjavljeni sastavi
      </h1>

      <UnpublishedEssayList essays={unpublishedEssays} />
    </ContentWrapper>
  );
};

export default UnpublishedEssaysPage;
