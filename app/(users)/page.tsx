import ContentWrapper from '@/components/ContentWrapper';
import Hero from '@/components/Hero';
import EssayCardSlideshowSkeleton from '@/components/Loaders/EssayCardSlideshowSkeleton';
import PopularEssaysSlideShow from '@/components/PopularEssaysSlideShow';
import { Suspense } from 'react';

const HomePage = async () => {
  return (
    <>
      <Hero />
      <ContentWrapper>
        <Suspense fallback={<EssayCardSlideshowSkeleton />}>
          <PopularEssaysSlideShow />
        </Suspense>
      </ContentWrapper>
    </>
  );
};

export default HomePage;
