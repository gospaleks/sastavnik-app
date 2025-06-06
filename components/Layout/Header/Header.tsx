import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCategories } from '@/lib/services/categoryService';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

import DesktopMenu from '@/components/Layout/Header/DesktopMenu';
import MobileMenu from '@/components/Layout/Header/MobileMenu';
import SearchBar from '@/components/Layout/Header/SearchBar';
import UserAvatar from '@/components/Layout/Header/UserAvatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import {
  LogInIcon,
  PlusCircleIcon,
  PlusIcon,
  User,
  UserCircleIcon,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { ModeToggle, ModeToggle2 } from '@/components/ModeToggle';

const Header = async () => {
  const { getUser, isAuthenticated, getPermission } = getKindeServerSession();
  const [isLoggedIn, user, categories, adminPermission] = await Promise.all([
    isAuthenticated(),
    getUser(),
    getAllCategories(),
    getPermission('admin:access'),
  ]);

  const isAdmin = adminPermission?.isGranted || false;

  return (
    <header className="bg-background sticky top-0 z-50 h-16 border-b">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4">
        {/* Navigacija MOBILE */}
        <div className="flex items-center justify-center sm:hidden">
          <MobileMenu categories={categories} user={user} />
        </div>

        {/* Logo */}
        <Logo width={120} height={50} />

        {/* Navigacija DESKTOP */}
        <DesktopMenu categories={categories} isLoggedIn={isLoggedIn} />

        <div className="flex items-center justify-center gap-4">
          <Link href="/dodaj-sastav" className="block sm:hidden">
            <PlusCircleIcon size={30} />
          </Link>

          <SearchBar />

          {isLoggedIn && <UserAvatar user={user} isAdmin={isAdmin} />}

          {/* Prijava i Registracija DESKTOP */}
          {!isLoggedIn && (
            <div className="hidden items-center gap-2 lg:flex">
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
              <ModeToggle2 />
            </div>
          )}

          {/* Prijava i Registracija MOBILE */}
          {!isLoggedIn && (
            <div className="flex items-center justify-center lg:hidden">
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

                  <DropdownMenuSeparator />
                  <ModeToggle />
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
