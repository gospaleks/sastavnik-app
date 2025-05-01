import Link from 'next/link';

import { cn } from '@/lib/utils';

import ContentWrapper from '@/components/ContentWrapper';

import { buttonVariants } from '@/components/ui/button';
import { Users, FolderPenIcon, LayoutDashboardIcon } from 'lucide-react';

const AdminNavigation = [
  { name: 'Korisnici', icon: Users, href: '/admin/korisnici' },
  { name: 'Kategorije', icon: FolderPenIcon, href: '/admin/kategorije' },
];

const AdminNavbar = () => {
  return (
    <div className="bg-accent border-b">
      <ContentWrapper className="flex items-center py-0">
        <h1 className="flex items-center gap-2 border-r pr-4 text-lg">
          <LayoutDashboardIcon size={17} />
          Admin Panel
        </h1>

        <nav className="flex flex-wrap text-sm font-medium text-gray-500">
          {AdminNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'link', size: 'sm' }),
                'rounded-none border-r transition-colors hover:bg-gray-200',
              )}
            >
              <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </nav>
      </ContentWrapper>
    </div>
  );
};

export default AdminNavbar;
