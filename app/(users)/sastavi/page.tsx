import { getEssays } from '@/lib/services/essayService';

import { loadSearchParams } from '@/lib/searchParams';
import { SearchParams } from 'nuqs/server';

import ContentWrapper from '@/components/ContentWrapper';
import EssayCard from '@/components/EssayCard';
import PagePagination from '@/components/PagePagination';
import { Suspense } from 'react';
import EssayCardGridSkeleton from '@/components/Loaders/EssayCardGridSkeleton';
import EssaysList from '@/components/EssaysList';
import Filters from '@/components/Filters';

export const metadata = {
  title: 'Svi sastavi',
};

type Props = {
  searchParams: Promise<SearchParams>;
};

const AllEssaysPage = async ({ searchParams }: Props) => {
  const { offset } = await loadSearchParams(searchParams);

  return (
    <ContentWrapper>
      <h1 className="text-primary mb-4 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
        Svi sastavi
      </h1>

      <Filters />

      <Suspense fallback={<EssayCardGridSkeleton />}>
        <EssaysList offset={offset} />
      </Suspense>
    </ContentWrapper>
  );
};

export default AllEssaysPage;
