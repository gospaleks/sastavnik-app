import { Suspense } from 'react';
import Hero from '@/components/Hero';
import ContentWrapper from '@/components/ContentWrapper';
import PopularEssaysSlideShow from '@/components/PopularEssaysSlideShow';
import EssayCardSlideshowSkeleton from '@/components/Loaders/EssayCardSlideshowSkeleton';
import LatestEssays from '@/components/LatestEssays';
import CategoriesCardList from '@/components/CategoriesCardList';
import EssaysByAuthorSkeleton from '@/components/Loaders/EssaysByAuthorSkeleton';
import QuoteOfTheDay from '@/components/QuoteOfTheDay';
import SubmitYourEssayCTA from '@/components/SubmitYourEssayCTA';

const HomePage = async () => {
  return (
    <>
      {/* Hero sekcija */}
      <Hero />

      {/* Popularni sastavi */}
      <section className="bg-white py-12">
        <ContentWrapper>
          <h2 className="mb-8 text-center text-4xl font-bold text-gray-800">
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
          <h2 className="mb-8 text-center text-4xl font-bold text-gray-800">
            📚 Istraži po kategorijama
          </h2>
          <CategoriesCardList />
        </ContentWrapper>
      </section>

      {/* Najnoviji sastavi */}
      <section className="bg-white py-12">
        <ContentWrapper>
          <div>
            <h2 className="mb-3 text-center text-4xl font-bold text-gray-800">
              📝 Najnoviji sastavi
            </h2>
            <p className="mb-6 text-center text-lg text-gray-600">
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
