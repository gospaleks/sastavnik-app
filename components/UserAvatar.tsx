import Link from 'next/link';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOutIcon, PlusIcon, UserIcon } from 'lucide-react';

type Props = {
  user: KindeUser<Record<string, any>>;
};

const UserAvatar = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          {user?.picture?.includes('gravatar.com') === false ? (
            <AvatarImage src={user?.picture || ''} />
          ) : null}

          <AvatarFallback>
            {user?.given_name ? user.given_name[0] : ''}
            {user?.family_name ? user.family_name[0] : ''}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <span className="text-sm font-semibold">
            {user?.given_name} {user?.family_name}
          </span>
          <br />
          {user?.email}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href={`/profil/${user.id}`}
            className="flex w-full items-center gap-2"
          >
            <UserIcon /> Profil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/dodaj-sastav" className="flex w-full items-center gap-2">
            <PlusIcon size={16} />
            Dodaj sastav
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutLink className="flex w-full items-center gap-2">
            <LogOutIcon /> Odjava
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
