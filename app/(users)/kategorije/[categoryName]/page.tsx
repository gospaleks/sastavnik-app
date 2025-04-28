import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SearchParams } from 'nuqs/server';
import { loadSearchParams } from '@/lib/searchParams';

import { doesCategoryExist } from '@/lib/services/categoryService';

import SortFilter from '@/components/SortFilter';
import ContentWrapper from '@/components/ContentWrapper';
import EssaysByCategoryList from '@/components/EssaysByCategoryList';
import EssayCardGridSkeleton from '@/components/Loaders/EssayCardGridSkeleton';

type PageProps = {
  params: Promise<{ categoryName: string }>;
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categoryName } = await params;
  const decodedCategoryName = decodeURIComponent(categoryName);
  return {
    title: `Kategorija - ${decodedCategoryName}`,
  };
}

const KategorijaPage = async ({ params, searchParams }: PageProps) => {
  const { categoryName } = await params;
  const { page, sort } = await loadSearchParams(searchParams);

  const decodedCategoryName = decodeURIComponent(categoryName);

  const doesExist = await doesCategoryExist(decodedCategoryName);
  if (!doesExist) return notFound();

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

export default KategorijaPage;
