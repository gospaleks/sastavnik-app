import { Suspense } from 'react';

import { SearchParams } from 'nuqs/server';
import { loadSearchParams } from '@/lib/searchParams';

import SortFilter from '@/components/SortFilter';
import ContentWrapper from '@/components/ContentWrapper';
import EssaysByCategoryList from '@/components/EssaysByCategoryList';
import EssayCardGridSkeleton from '@/components/Loaders/EssayCardGridSkeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const { categoryName } = await params;
  const decodedCategoryName = decodeURIComponent(categoryName);
  return {
    title: `Kategorija - ${decodedCategoryName}`,
  };
}

export const KategorijePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ categoryName: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const { categoryName } = await params;
  const { page, sort } = await loadSearchParams(searchParams);

  const decodedCategoryName = decodeURIComponent(categoryName);

  return (
    <ContentWrapper>
      <div className="mb-8 space-y-2 text-center">
        <p className="text-muted-foreground text-sm md:text-base">
          Svi sastavi iz kategorije
        </p>
        <h1 className="text-primary text-4xl font-extrabold tracking-tight md:text-5xl">
          {decodedCategoryName}
        </h1>
      </div>

      <SortFilter />

      <Suspense fallback={<EssayCardGridSkeleton />}>
        <EssaysByCategoryList
          categoryName={decodedCategoryName}
          page={page}
          sort={sort}
        />
      </Suspense>
    </ContentWrapper>
  );
};

export default KategorijePage;
