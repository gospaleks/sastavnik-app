import ContentWrapper from '@/components/ContentWrapper';
import EssaysByCategoryList from '@/components/EssaysByCategoryList';
import EssayCardGridSkeleton from '@/components/Loaders/EssayCardGridSkeleton';
import { Suspense } from 'react';

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
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = await params;
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

      <Suspense fallback={<EssayCardGridSkeleton />}>
        <EssaysByCategoryList categoryName={decodedCategoryName} />
      </Suspense>
    </ContentWrapper>
  );
};

export default KategorijePage;
