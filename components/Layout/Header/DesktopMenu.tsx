import Link from 'next/link';

import { Category } from '@prisma/client';

import { buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

type Props = {
  categories: Category[];
  isLoggedIn: boolean;
};

const DesktopMenu = ({ categories, isLoggedIn }: Props) => {
  return (
    <NavigationMenu className="hidden sm:block">
      <NavigationMenuList className="flex items-center gap-2">
        <NavigationMenuItem>
          <Link href="/sastavi" className={`${navigationMenuTriggerStyle()}`}>
            Sastavi
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Kategorije</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-auto">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/kategorije/${category.name}`}
                    className={buttonVariants({
                      variant: 'ghost',
                      className: 'flex w-full justify-start',
                    })}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/dodaj-sastav"
            className={`${navigationMenuTriggerStyle()} hidden sm:block`}
          >
            Dodaj sastav
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopMenu;
