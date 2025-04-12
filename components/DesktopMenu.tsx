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
};

const DesktopMenu = ({ categories }: Props) => {
  return (
    <NavigationMenu className="hidden sm:block">
      <NavigationMenuList className="flex items-center gap-2">
        <NavigationMenuItem>
          <Link
            href="/sastavi"
            className={`${navigationMenuTriggerStyle()} hover:bg-muted rounded-lg px-4 py-2 transition-colors`}
          >
            Sastavi
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Kategorije</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[185px]">
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopMenu;
