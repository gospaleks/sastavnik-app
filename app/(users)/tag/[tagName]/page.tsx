import { Suspense } from 'react';

import EssaysByTagList from './EssaysByTagList';

import EssayCardGridSkeleton from '@/components/Loaders/EssayCardGridSkeleton';
import ContentWrapper from '@/components/ContentWrapper';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tagName: string }>;
}) {
  const { tagName } = await params;
  const decodedTagName = decodeURIComponent(tagName);

  return {
    title: `Tag - ${decodedTagName}`,
  };
}

const TagPage = async ({
  params,
}: {
  params: Promise<{ tagName: string }>;
}) => {
  const { tagName } = await params;
  const decodedTagName = decodeURIComponent(tagName);

  return (
    <ContentWrapper>
      <div className="mb-8 space-y-2 text-center">
        <p className="text-muted-foreground text-sm md:text-base">Tag</p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          {decodedTagName}
        </h1>
      </div>

      <Suspense fallback={<EssayCardGridSkeleton />}>
        <EssaysByTagList tagName={decodedTagName} />
      </Suspense>
    </ContentWrapper>
  );
};

export default TagPage;
