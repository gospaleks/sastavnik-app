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
import Logo from '@/components/Logo';
import { ScrollArea } from '@/components/ui/scroll-area';

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
            <div onClick={() => setIsOpen(false)}>
              <Logo width={120} height={50} />
            </div>
          </DrawerTitle>

          <DrawerClose>
            <div className="hover:bg-accent flex items-center justify-center rounded-full p-2 transition-colors">
              <X size={25} />
            </div>
          </DrawerClose>
        </DrawerHeader>

        {/** Navigacija */}
        <ScrollArea className="h-[calc(100vh-200px)]">
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
                <AccordionTrigger className="text-lg font-normal">
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
                          className="hover:bg-accent flex w-full items-center justify-between rounded-lg p-2 transition-colors"
                        >
                          {category.name} <ChevronRightIcon size={15} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              href="/dodaj-sastav"
              className="mt-4 w-full border-b pb-4 text-lg hover:underline"
              onClick={() => setIsOpen(false)} // zatvara drawer kada se klikne na link
            >
              Dodaj sastav
            </Link>
            <Link
              href="/o-nama"
              className="mt-4 w-full border-b pb-4 text-lg hover:underline"
              onClick={() => setIsOpen(false)} // zatvara drawer kada se klikne na link
            >
              O platformi Sastavnik
            </Link>
            <Link
              href="/privatnost"
              className="mt-4 w-full border-b pb-4 text-lg hover:underline"
              onClick={() => setIsOpen(false)} // zatvara drawer kada se klikne na link
            >
              Pravila privatnosti
            </Link>
          </div>
        </ScrollArea>

        {user && (
          <DrawerFooter className="border-t px-0">
            <Link
              href={`/profil/${user.id}`}
              onClick={() => setIsOpen(false)}
              className="flex flex-row items-center gap-2"
            >
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

              <div className="hover:bg-accent flex items-center justify-center rounded-full p-2 transition-colors">
                <ExternalLinkIcon size={20} />
              </div>
            </Link>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
