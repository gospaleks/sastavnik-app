import { Suspense } from 'react';

import EssaysByAuthorSkeleton from '@/components/Loaders/EssaysByAuthorSkeleton';
import EssayCardSlideshowSkeleton from '@/components/Loaders/EssayCardSlideshowSkeleton';

import ContentWrapper from '@/components/ContentWrapper';
import Hero from '@/components/HomePage/Hero';
import PopularEssaysSlideShow from '@/components/HomePage/PopularEssaysSlideShow';
import CategoriesCardList from '@/components/CategoriesCardList';
import LatestEssays from '@/components/HomePage/LatestEssays';
import Benefits from '@/components/HomePage/Benefits';
import SubmitYourEssayCTA from '@/components/HomePage/SubmitYourEssayCTA';

import { Badge } from '@/components/ui/badge';

const HomePage = async () => {
  return (
    <>
      {/* Hero sekcija */}
      <Hero />

      {/* Popularni sastavi */}
      <section className="border-foreground py-12">
        <ContentWrapper>
          <div className="pl-2 md:pl-0 md:text-center">
            <Badge className="mb-3">Popularni radovi</Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Najbolje ocenjeni radovi
            </h2>
            <p className="text-md text-muted-foreground mb-6 sm:text-lg">
              Otkrijte sastave koji su osvojili srca naše zajednice
            </p>
          </div>

          <Suspense fallback={<EssayCardSlideshowSkeleton />}>
            <PopularEssaysSlideShow />
          </Suspense>
        </ContentWrapper>
      </section>

      {/* Kategorije sastava */}
      <section
        style={{
          backgroundImage: "url('/hero_light.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="dark:bg-background border-foreground">
          <ContentWrapper className="py-12">
            <div className="pl-2 md:pl-0 md:text-center">
              <Badge className="mb-3">Kategorije</Badge>
              <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Istraži sve oblasti znanja
              </h2>
              <p className="text-md text-muted-foreground mb-6 sm:text-lg">
                Pronađi inspiraciju i učenje kroz različite kategorije sastava
              </p>
            </div>
            <CategoriesCardList />
          </ContentWrapper>
        </div>
      </section>

      {/* Najnoviji sastavi */}
      <section className="border-foreground py-12">
        <ContentWrapper>
          <div className="pl-2 md:pl-0 md:text-center">
            <Badge className="mb-3">Najnoviji radovi</Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Najnoviji sastavi u našoj zajednici
            </h2>
            <p className="text-md text-muted-foreground mb-6 sm:text-lg">
              Otkrijte najnovije radove naših talentovanih autora
            </p>
          </div>
          <Suspense fallback={<EssaysByAuthorSkeleton />}>
            <LatestEssays />
          </Suspense>
        </ContentWrapper>
      </section>

      {/* Benefits */}
      <Benefits />

      {/* CTA za slanje sastava */}
      <SubmitYourEssayCTA />
    </>
  );
};

export default HomePage;
