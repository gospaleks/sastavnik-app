'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

import { ChevronRightIcon, Menu, X } from 'lucide-react';

type Props = {
  categories: {
    id: string;
    name: string;
  }[];
};

const MobileMenu = ({ categories }: Props) => {
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
            className="w-full border-b pb-4 text-lg font-semibold"
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
                      className="py-2"
                      onClick={() => setIsOpen(false)} // zatvara drawer kada se klikne na kategoriju
                    >
                      <Link
                        href={`/kategorije/${category.name}`}
                        className="flex w-full items-center justify-start"
                      >
                        {category.name} <ChevronRightIcon size={17} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <DrawerFooter>
          {/** TODO: User avatar sa podacima ili prijava/registracija */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
