import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
      <div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Kategorija nije pronađena
        </p>
      </div>

      <Link href="/" className={buttonVariants({ size: 'lg' })}>
        <HomeIcon />
        Početna
      </Link>
    </div>
  );
};

export default NotFound;
