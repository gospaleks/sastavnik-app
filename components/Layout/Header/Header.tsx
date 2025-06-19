'use client';

import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

import { Category } from '@prisma/client';

import DesktopMenu from '@/components/Layout/Header/DesktopMenu';
import MobileMenu from '@/components/Layout/Header/MobileMenu';
import SearchBar from '@/components/Layout/Header/SearchBar';
import UserAvatar from '@/components/Layout/Header/UserAvatar';
import Notifications from '@/components/Layout/Header/Notifications';
import Logo from '@/components/Logo';
import { ModeToggle, ModeToggle2 } from '@/components/ModeToggle';

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

const Header = () => {
  // Kinde authentication hooks
  const {
    getUser,
    isAuthenticated: isLoggedIn,
    getPermission,
  } = useKindeBrowserClient();
  const user = getUser();
  const isAdmin = getPermission('admin:access').isGranted || false;

  // State for categories
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category/all');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
          <SearchBar />

          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <Notifications user={user} />
              <UserAvatar user={user} isAdmin={isAdmin} />
            </div>
          )}

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
