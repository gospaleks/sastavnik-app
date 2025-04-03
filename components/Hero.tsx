import Link from 'next/link';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const Hero = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  return (
    <section className="w-full bg-gray-100 px-6 py-16 text-center dark:bg-gray-800">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Kreiraj. Uči. Inspiriši. 📖
        </h1>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          Pregledaj i deli sastave na razne teme – za osnovnu i srednju školu.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" asChild>
            <Link href="/sastavi">Pregledaj sastave</Link>
          </Button>
          {isLoggedIn && (
            <Button size="lg" variant="outline" asChild>
              <Link href="/dodaj-sastav">
                <PlusIcon />
                Dodaj svoj sastav
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
