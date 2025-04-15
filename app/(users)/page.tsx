import { Suspense } from 'react';

import EssaysByAuthorSkeleton from '@/components/Loaders/EssaysByAuthorSkeleton';
import EssayCardSlideshowSkeleton from '@/components/Loaders/EssayCardSlideshowSkeleton';

import Hero from '@/components/HomePage/Hero';
import PopularEssaysSlideShow from '@/components/HomePage/PopularEssaysSlideShow';
import LatestEssays from '@/components/HomePage/LatestEssays';
import QuoteOfTheDay from '@/components/HomePage/QuoteOfTheDay';
import SubmitYourEssayCTA from '@/components/HomePage/SubmitYourEssayCTA';

import ContentWrapper from '@/components/ContentWrapper';
import CategoriesCardList from '@/components/CategoriesCardList';

const HomePage = async () => {
  return (
    <>
      {/* Hero sekcija */}
      <Hero />

      {/* Popularni sastavi */}
      <section className="bg-white py-12">
        <ContentWrapper>
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 sm:text-4xl">
            🔥 Popularni sastavi
          </h2>

          <Suspense fallback={<EssayCardSlideshowSkeleton />}>
            <PopularEssaysSlideShow />
          </Suspense>
        </ContentWrapper>
      </section>

      {/* Kategorije sastava */}
      <section className="bg-gray-50 py-12">
        <ContentWrapper>
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 sm:text-4xl">
            📚 Istraži po kategorijama
          </h2>
          <CategoriesCardList />
        </ContentWrapper>
      </section>

      {/* Najnoviji sastavi */}
      <section className="bg-white py-12">
        <ContentWrapper>
          <div>
            <h2 className="mb-3 text-center text-3xl font-bold text-gray-800 sm:text-4xl">
              📝 Najnoviji sastavi
            </h2>
            <p className="text-md mb-6 text-center text-gray-600 sm:text-lg">
              Pogledajte najnovije sastave koje su napisali naši korisnici.
            </p>
          </div>
          <Suspense fallback={<EssaysByAuthorSkeleton />}>
            <LatestEssays />
          </Suspense>
        </ContentWrapper>
      </section>

      {/* Citat */}
      <QuoteOfTheDay />

      {/* CTA za slanje sastava */}
      <SubmitYourEssayCTA />
    </>
  );
};

export default HomePage;
