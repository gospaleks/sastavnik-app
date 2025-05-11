'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import ContentWrapper from '@/components/ContentWrapper';

import { buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import {
  Users,
  FolderPenIcon,
  LayoutDashboardIcon,
  FileTextIcon,
} from 'lucide-react';

const AdminNavigation = [
  { name: 'Korisnici', icon: Users, href: '/admin/korisnici' },
  { name: 'Kategorije', icon: FolderPenIcon, href: '/admin/kategorije' },
  { name: 'Sastavi', icon: FileTextIcon, href: '/admin/sastavi' },
];

const AdminNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-muted sticky top-16 z-10 border-b">
      <ContentWrapper className="flex items-center overflow-x-auto py-2 sm:py-0">
        <h1 className="flex items-center gap-2 pr-4">
          <LayoutDashboardIcon size={17} />
          <span className="hidden sm:block">Admin Panel</span>
        </h1>
        <nav className="flex text-sm">
          {AdminNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'hover:bg-primary hover:text-primary-foreground rounded-none transition-colors sm:border-r',
                pathname.includes(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : '',
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
