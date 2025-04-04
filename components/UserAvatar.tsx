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
import { LogOutIcon } from 'lucide-react';

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
          {user?.given_name} {user?.family_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink className="cursor-pointer">
            <LogOutIcon /> Odjava
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
