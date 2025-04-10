import { Suspense } from 'react';

import { loadSearchParams } from '@/lib/searchParams';
import { SearchParams } from 'nuqs/server';

import ContentWrapper from '@/components/ContentWrapper';
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
  const { page, searchTerm, schoolType, grade } =
    await loadSearchParams(searchParams);

  return (
    <ContentWrapper>
      <h1 className="text-primary mb-4 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
        Svi sastavi
      </h1>

      <Filters />

      <Suspense fallback={<EssayCardGridSkeleton />}>
        <EssaysList
          page={page}
          searchTerm={searchTerm}
          schoolType={schoolType}
          grade={grade}
        />
      </Suspense>
    </ContentWrapper>
  );
};

export default AllEssaysPage;
