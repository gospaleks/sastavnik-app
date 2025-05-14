import Link from 'next/link';
import Image from 'next/image';

import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeft, HomeIcon } from 'lucide-react';
import Logo from '@/components/Logo';

export const metadata = {
  title: '404 - Stranica nije pronađena',
};

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg">Stranica koju tražite nije pronađena</p>
      </div>

      <Link href="/" className={buttonVariants({ size: 'lg' })}>
        <HomeIcon />
        Vrati se na početnu
      </Link>

      <Logo width={120} height={50} />
    </div>
  );
};

export default NotFound;
