import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';

const Hero = async () => {
  const content = (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-5xl font-extrabold tracking-tight">
        <span className="hidden md:inline">📖</span>{' '}
        <span className="block md:inline">Kreiraj.</span>{' '}
        <span className="block md:inline">Uči.</span>{' '}
        <span className="block md:inline">Inspiriši.</span>{' '}
        <span className="hidden md:inline">📖</span>
      </h1>
      <p className="mb-6 text-base sm:text-lg">
        Sastavi za osnovnu i srednju školu. Inspiriši se, nauči i napiši svoj
        najbolji sastav do sada!
      </p>
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <Button size="lg" asChild>
          <Link href="/sastavi">📑 Pregledaj sastave</Link>
        </Button>

        <Button size="lg" variant="outline" asChild>
          <Link href="/dodaj-sastav">
            <PlusCircleIcon />
            Dodaj sastav
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero sekcija u zavisnosti od light/dark moda */}
      <section
        className="w-full px-6 py-10 text-center sm:py-20 dark:hidden"
        style={{
          backgroundImage: "url('/hero3.jpg')",
          backgroundSize: 'cover',
        }}
      >
        {content}
      </section>

      <section
        className="hidden w-full px-6 py-10 text-center sm:py-20 dark:block"
        style={{
          backgroundImage: "url('/hero_dark.jpg')",
          backgroundSize: 'cover',
        }}
      >
        {content}
      </section>
    </>
  );
};

export default Hero;
