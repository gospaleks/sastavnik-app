import Link from 'next/link';

import {
  getKindeServerSession,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';

import { Button, buttonVariants } from '@/components/ui/button';
import { PlusIcon, UserIcon } from 'lucide-react';

const Hero = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  return (
    <section
      className="w-full bg-gray-100 px-6 py-10 text-center sm:py-20 dark:bg-gray-800"
      style={{
        backgroundImage: "url('/hero_background.jpg')",
        backgroundSize: 'cover',
      }}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
          <span className="hidden sm:inline">📖</span>{' '}
          <span className="block sm:inline">Kreiraj.</span>{' '}
          <span className="block sm:inline">Uči.</span>{' '}
          <span className="block sm:inline">Inspiriši.</span>{' '}
          <span className="hidden sm:inline">📖</span>
        </h1>
        <p className="mb-6 text-base text-gray-700 sm:text-lg dark:text-gray-300">
          Sastavi za osnovnu i srednju školu. Inspiriši se, nauči i napiši svoj
          najbolji sastav do sada!
        </p>
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Button size="lg" asChild>
            <Link href="/sastavi">📑 Pregledaj sastave</Link>
          </Button>
          {isLoggedIn ? (
            <Button size="lg" variant="outline" asChild>
              <Link href="/dodaj-sastav">
                <PlusIcon />
                Dodaj svoj sastav
              </Link>
            </Button>
          ) : (
            <RegisterLink
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
              })}
            >
              <UserIcon />
              Prijavi se i započni
            </RegisterLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
