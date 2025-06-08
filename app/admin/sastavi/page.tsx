import { Metadata } from 'next/types';

import { getUnpublishedEssays } from '@/data/essay/getUnpublishedEssays';

import ContentWrapper from '@/components/ContentWrapper';
import UnpublishedEssayList from './UnpublishedEssayList';

export const metadata: Metadata = {
  title: 'Neobjavljeni sastavi',
};

const UnpublishedEssaysPage = async () => {
  const unpublishedEssays = await getUnpublishedEssays(); // metoda getUnpublishedEssays ima requireAdmin u sebi

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
