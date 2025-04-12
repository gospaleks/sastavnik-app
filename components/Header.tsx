import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCategories } from '@/lib/services/categoryService';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

import SearchBar from '@/components/SearchBar';
import UserAvatar from '@/components/UserAvatar';
import DesktopMenu from '@/components/DesktopMenu';
import MobileMenu from '@/components/MobileMenu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { buttonVariants } from '@/components/ui/button';
import { LogInIcon, User, UserCircleIcon } from 'lucide-react';

const Header = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const [isLoggedIn, user, categories] = await Promise.all([
    isAuthenticated(),
    getUser(),
    getAllCategories(),
  ]);

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-white">
      <div className="container mx-auto flex h-full items-center justify-between gap-4 px-4">
        {/* Navigacija MOBILE */}
        <div className="flex items-center justify-center sm:hidden">
          <MobileMenu categories={categories} user={user} />
        </div>

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

        {/* Navigacija DESKTOP */}
        <DesktopMenu categories={categories} />

        <div className="flex items-center justify-center gap-4">
          <SearchBar />

          {isLoggedIn && <UserAvatar user={user} />}

          {/* Prijava i Registracija DESKTOP */}
          <div className="hidden items-center gap-2 md:flex">
            {!isLoggedIn && (
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

          {/* Prijava i Registracija MOBILE */}
          {!isLoggedIn && (
            <div className="flex items-center justify-center md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserCircleIcon size={30} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <LoginLink>
                      <LogInIcon />
                      Prijava
                    </LoginLink>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <RegisterLink>
                      <User />
                      Registracija
                    </RegisterLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
