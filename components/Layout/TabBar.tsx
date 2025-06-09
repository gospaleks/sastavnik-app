'use client';

import Link from 'next/link';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

import SearchBarMobile from './SearchBarMobile';
import { PlusCircleIcon, HomeIcon, UserIcon, LogInIcon } from 'lucide-react';

const TabBar = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <div className="bg-background border-muted sticky bottom-0 z-50 block border-t md:hidden">
      <div className="flex items-center justify-around">
        <Link href="/">
          <div className="p-4">
            <HomeIcon size={28} />
          </div>
        </Link>

        <Link href="/dodaj-sastav">
          <div className="p-4">
            <PlusCircleIcon size={32} />
          </div>
        </Link>

        <div className="p-4">
          <SearchBarMobile />
        </div>

        <div className="p-4">
          {user ? (
            <Link href={`/profil/${user.id}`}>
              <UserIcon size={28} />
            </Link>
          ) : (
            <LoginLink>
              <LogInIcon />
            </LoginLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabBar;
