'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
  width: number;
  height: number;
  className?: string;
};

const Logo = ({ width, height, className }: Props) => {
  const { theme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const logoSrc =
    currentTheme === 'dark' ? '/logo_navbar_dark.png' : '/logo_navbar.png';

  return (
    <Link href="/" passHref>
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src={logoSrc}
          alt="Sastavnik"
          width={width}
          height={height}
          className="h-auto w-auto cursor-pointer"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
