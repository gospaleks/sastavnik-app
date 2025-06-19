'use client';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  width: number;
  height: number;
  className?: string;
};

const Logo = ({ width, height, className }: Props) => {
  return (
    <Link href="/" passHref>
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src={'/logo_navbar.png'}
          alt="Sastavnik"
          width={width}
          height={height}
          className="h-auto w-auto cursor-pointer dark:hidden"
          priority
        />
        <Image
          src={'/logo_navbar_dark.png'}
          alt="Sastavnik"
          width={width}
          height={height}
          className="hidden h-auto w-auto cursor-pointer dark:block"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
