import Link from 'next/link';
import Image from 'next/image';

import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: '404 - Stranica nije pronađena',
};

const NotFound = () => {
  return (
    <div className="bg-accent flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Stranica nije pronađena
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Izgleda da stranica koju tražite ne postoji.
        </p>
      </div>

      <Link href="/" className={buttonVariants({ size: 'lg' })}>
        <ArrowLeft />
        Vrati se na početnu
      </Link>

      <Link href="/">
        <Image
          src="/logo_navbar.png"
          alt="Sastavnik"
          width={100}
          height={50}
          className="h-auto w-auto cursor-pointer"
          priority
        />
      </Link>
    </div>
  );
};

export default NotFound;
