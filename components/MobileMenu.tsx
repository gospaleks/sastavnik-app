'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { ChevronRightIcon, ExternalLinkIcon, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  categories: {
    id: string;
    name: string;
  }[];
  user: KindeUser<Record<string, any>>;
};

const MobileMenu = ({ categories, user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <Menu size={30} />
      </DrawerTrigger>

      <DrawerContent className="p-4">
        {/** Header navigacije */}
        <DrawerHeader className="mb-4 flex flex-row items-center justify-between px-0">
          <DrawerTitle className="text-base">
            <Link href="/">
              <div>
                <Image
                  src="/logo_navbar.png"
                  alt="Sastavnik"
                  width={120}
                  height={50}
                  className="h-auto w-auto cursor-pointer"
                  priority
                />
              </div>
            </Link>
          </DrawerTitle>

          <DrawerClose>
            <div className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200">
              <X size={25} />
            </div>
          </DrawerClose>
        </DrawerHeader>

        {/** Navigacija */}
        <div className="flex flex-col gap-2">
          <Link
            href="/sastavi"
            className="w-full border-b pb-4 text-lg hover:underline"
            onClick={() => setIsOpen(false)} // zatvara drawer kada se klikne na link
          >
            Sastavi
          </Link>

          <Accordion type="single" collapsible className="w-full border-b">
            <AccordionItem value="kategorije">
              <AccordionTrigger className="text-lg">
                Kategorije
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="py-1"
                      onClick={() => setIsOpen(false)} // zatvara drawer kada se klikne na kategoriju
                    >
                      <Link
                        href={`/kategorije/${category.name}`}
                        className="hover:bg-accent flex w-full items-center justify-start rounded-lg p-2 transition-colors"
                      >
                        {category.name} <ChevronRightIcon size={15} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {user && (
          <DrawerFooter className="flex flex-row items-center border-t px-0">
            <Avatar>
              {user?.picture?.includes('gravatar.com') === false ? (
                <AvatarImage src={user?.picture || ''} />
              ) : null}

              <AvatarFallback>
                {user?.given_name ? user.given_name[0] : ''}
                {user?.family_name ? user.family_name[0] : ''}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user.given_name} {user.family_name}
              </span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <div className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200">
              <Link href={`/profil/${user.id}`}>
                <ExternalLinkIcon size={25} />
              </Link>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
