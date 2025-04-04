import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { prisma } from '@/lib/prisma';

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
  const [isLoggedIn, user, categories] = await Promise.all([
    isAuthenticated(),
    getUser(),
    prisma.category.findMany(), // Fetch categories from the database
  ]);

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-white">
      <div className="container mx-auto flex h-full items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" passHref>
          <div>
            <Image
              src="/logo_navbar.png"
              alt="Sastavnik"
              width={120}
              height={50}
              className="h-auto w-auto cursor-pointer"
              priority
            />
          </div>
        </Link>

        {/* Navigacija */}
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <Link href="/sastavi" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} hover:bg-muted rounded-lg px-4 py-2 transition-colors`}
                >
                  Sastavi
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Kategorije</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[185px]">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/kategorije/${category.name}`}
                        className={buttonVariants({
                          variant: 'ghost',
                          className: 'flex w-full justify-start',
                        })}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
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
