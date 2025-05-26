import Link from 'next/link';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

import MyAvatar from '@/components/MyAvatar';
import { ModeToggle } from '@/components/ModeToggle';

import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileTextIcon,
  FolderPenIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MessageSquareIcon,
  PlusIcon,
  UserIcon,
} from 'lucide-react';

type Props = {
  user: KindeUser<Record<string, any>>;
  isAdmin: boolean;
};

const UserAvatar = ({ user, isAdmin }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <MyAvatar
          imageUrl={user.picture}
          fallbackText={
            (user.given_name ? user.given_name[0] : '') +
            (user.family_name ? user.family_name[0] : '')
          }
          className="border"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-sm">
          <span className="font-semibold">
            {user?.given_name} {user?.family_name}
          </span>
          <br />
          <span className="font-normal">{user?.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href={`/profil/${user.id}`}
            className="flex w-full items-center gap-2"
          >
            <UserIcon /> Profil
            {isAdmin && (
              <div className="ml-auto">
                <Badge className="mx-0">admin</Badge>
              </div>
            )}
          </Link>
        </DropdownMenuItem>

        {/** Admin sekcija */}
        {isAdmin && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link
                href="/admin/korisnici"
                className="flex w-full items-center gap-2"
              >
                <LayoutDashboardIcon size={16} />
                Admin panel
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href="/admin/kategorije"
                className="flex w-full items-center gap-2"
              >
                <FolderPenIcon size={16} />
                Kategorije
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href="/admin/sastavi"
                className="flex w-full items-center gap-2"
              >
                <FileTextIcon size={16} />
                Sastavi
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href="/admin/komentari"
                className="flex w-full items-center gap-2"
              >
                <MessageSquareIcon size={16} />
                Komentari
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem>
          <Link href="/dodaj-sastav" className="flex w-full items-center gap-2">
            <PlusIcon size={16} />
            Dodaj sastav
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <ModeToggle />

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
