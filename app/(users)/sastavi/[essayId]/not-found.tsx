import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
      <div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Sastav nije pronadjen
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/" className={buttonVariants({ size: 'lg' })}>
          <HomeIcon />
          Početna
        </Link>

        <Link
          href="/sastavi"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Vidi sve sastave
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
