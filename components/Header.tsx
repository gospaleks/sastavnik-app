import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

import UserAvatar from '@/components/UserAvatar';

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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { buttonVariants } from '@/components/ui/button';
import { LogInIcon, Menu, User } from 'lucide-react';

const Header = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  return (
    <header className="h-16 border-b">
      <div className="container mx-auto flex h-full items-center justify-between gap-4 px-4">
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
        <NavigationMenu className="hidden sm:block">
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
          </NavigationMenuList>
        </NavigationMenu>

        {/* Prijava i Registracija */}
        <div className="hidden items-center gap-2 sm:flex">
          {isLoggedIn ? (
            <UserAvatar user={user} />
          ) : (
            <>
              <LoginLink
                className={buttonVariants({
                  variant: 'outline',
                })}
              >
                <LogInIcon />
                Prijava
              </LoginLink>
              <RegisterLink className={buttonVariants()}>
                <User />
                Registracija
              </RegisterLink>
            </>
          )}
        </div>

        {/* Hamburger Menu za mobilni prikaz */}
        <div className="sm:hidden">
          <Drawer direction="right">
            <DrawerTrigger>
              <Menu size={30} />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Sastavnik</DrawerTitle>
              </DrawerHeader>

              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
