import Image from 'next/image';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="h-16 border-b">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        {/* Logo */}
        <div>
          <Image
            src="/logo_navbar.png"
            alt="Sastavnik"
            width={150}
            height={50}
            className="cursor-pointer"
          />
        </div>

        {/* Navigacija */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/sastavi" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sastavi
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Razredi</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px]">Svi razredi...</div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/o-nama" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  O nama
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Prijava i Registracija */}
        <div>
          <Button variant="outline" className="mr-2">
            Prijava
          </Button>
          <Button variant="default">Registracija</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
