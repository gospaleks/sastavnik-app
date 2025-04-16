'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, X } from 'lucide-react';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // handleSubmit za desktop formu
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = searchValue.trim();
    if (!trimmed) return;

    router.push(
      `/sastavi?searchTerm=${encodeURIComponent(trimmed.toLowerCase())}`,
    );
    setSearchValue('');
    setIsOpen(false); // zatvara drawer
  };

  // handleSubmit za dugme na mobilnoj verziji
  const handleButtonClick = () => {
    const trimmed = searchValue.trim();
    if (!trimmed) return;

    router.push(
      `/sastavi?searchTerm=${encodeURIComponent(trimmed.toLowerCase())}`,
    );
    setSearchValue('');
    setIsOpen(false); // zatvara drawer
  };

  return (
    <>
      {/* Desktop */}
      <div className="relative hidden w-auto items-center md:flex">
        <form onSubmit={handleSubmit}>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            name="searchTerm"
            className="w-[150px] rounded-full pl-10 shadow-none"
            placeholder="Pretraži..."
          />
        </form>
        <SearchIcon size={20} className="absolute left-3 text-gray-500" />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden">
        <Drawer direction="top" open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <SearchIcon size={29} className="text-gray-500" />
          </DrawerTrigger>

          <DrawerContent className="p-4">
            <DrawerHeader className="flex flex-row items-center justify-between px-1">
              <DrawerTitle className="text-base">Pretraga</DrawerTitle>
              <DrawerClose asChild>
                <button onClick={() => setIsOpen(false)}>
                  <X size={20} className="text-gray-500" />
                </button>
              </DrawerClose>
            </DrawerHeader>

            {/* Umesto DrawerDescription obican div jer onako baca gresku da je form unutar p taga */}
            <div className="w-full">
              <form onSubmit={handleSubmit} className="relative mt-4 w-full">
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  name="searchTerm"
                  className="w-full rounded-full pr-4 pl-10 text-base shadow-none"
                  placeholder="Unesi pojam za pretragu..."
                />
                <SearchIcon
                  size={20}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
                />
              </form>
            </div>

            <DrawerFooter className="mt-4 px-1">
              <Button
                type="submit"
                className="w-full rounded-full text-base"
                onClick={handleButtonClick}
              >
                Pretraži
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default SearchBar;
