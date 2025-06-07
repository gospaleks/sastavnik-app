'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { SearchIcon, X } from 'lucide-react';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
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
  };

  return (
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
      <SearchIcon size={20} className="absolute left-3" />
    </div>
  );
};

export default SearchBar;
