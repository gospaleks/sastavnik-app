import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: '404 - Stranica nije pronađena',
};

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
        Stranica nije pronađena
      </p>
      <p className="text-md mt-2 text-gray-600 dark:text-gray-400">
        Izgleda da stranica koju tražite ne postoji.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">
          <ArrowLeft />
          Vrati se na početnu
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
