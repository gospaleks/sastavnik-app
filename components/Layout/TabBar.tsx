'use client';

import Link from 'next/link';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

import SearchBarMobile from './SearchBarMobile';
import {
  PlusCircleIcon,
  HomeIcon,
  UserIcon,
  LogInIcon,
  FileTextIcon,
  LayoutListIcon,
} from 'lucide-react';

const TabBar = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <div className="bg-background border-muted sticky bottom-0 z-50 block border-t md:hidden">
      <div className="flex items-center justify-around p-4">
        <Link href="/" className="flex flex-col items-center gap-1">
          <HomeIcon size={28} />
          <span className="text-xs">Početna</span>
        </Link>

        <Link href="/sastavi" className="flex flex-col items-center gap-1">
          <LayoutListIcon size={28} />
          <span className="text-xs">Sastavi</span>
        </Link>

        <Link href="/dodaj-sastav" className="flex flex-col items-center gap-1">
          <PlusCircleIcon size={28} />
          <span className="text-xs">Dodaj</span>
        </Link>

        <SearchBarMobile />

        {user ? (
          <Link
            href={`/profil/${user.id}`}
            className="flex flex-col items-center gap-1"
          >
            <UserIcon size={28} />
            <span className="text-xs">Profil</span>
          </Link>
        ) : (
          <LoginLink className="flex flex-col items-center gap-1">
            <LogInIcon size={28} />
            <span className="text-xs">Prijava</span>
          </LoginLink>
        )}
      </div>
    </div>
  );
};

export default TabBar;
