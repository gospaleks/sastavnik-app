import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';

const Hero = async () => {
  return (
    <section
      className="w-full bg-gray-100 px-6 py-10 text-center sm:py-20 dark:bg-gray-800"
      style={{
        backgroundImage: "url('/hero_background.jpg')",
        backgroundSize: 'cover',
      }}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white">
          <span className="hidden md:inline">📖</span>{' '}
          <span className="block md:inline">Kreiraj.</span>{' '}
          <span className="block md:inline">Uči.</span>{' '}
          <span className="block md:inline">Inspiriši.</span>{' '}
          <span className="hidden md:inline">📖</span>
        </h1>
        <p className="mb-6 text-base text-gray-700 sm:text-lg dark:text-gray-300">
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
    </section>
  );
};

export default Hero;
