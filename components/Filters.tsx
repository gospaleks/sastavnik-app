'use client';

import { useCallback, useState } from 'react';

import { parseAsInteger, useQueryState } from 'nuqs';

import { debounce } from 'lodash';

import SortFilter from '@/components/SortFilter';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { refetchEssays } from '@/data/essay/refetchEssays';
import { Button } from '@/components/ui/button';
import { FilterIcon, FilterXIcon, SearchIcon, XIcon } from 'lucide-react';
import TooltipItem from './TooltipItem';

const Filters = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const toggleFilters = () => {
    setIsFiltersOpen((prev) => !prev);
  };

  // Query states
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const [searchTerm, setSearchTerm] = useQueryState('searchTerm', {
    defaultValue: '',
  });
  const [schoolType, setSchoolType] = useQueryState('schoolType', {
    defaultValue: '',
  });
  const [grade, setGrade] = useQueryState('grade', {
    defaultValue: '',
  });

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetchEssays();
    }, 400),
    [refetchEssays],
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(() => value.toLowerCase());
    debouncedRefetch();
    setPage(1);
  };

  const handleSchoolTypeChange = (value: string) => {
    setSchoolType(value);
    setGrade('');
    setTimeout(() => {
      refetchEssays();
    }, 0);
    setPage(1);
  };

  const handleGradeChange = (value: string) => {
    setGrade(value);
    setTimeout(() => {
      refetchEssays();
    }, 0);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSchoolType('');
    setGrade('');

    setPage(1);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      refetchEssays();
    }, 0);
  };

  const filterContent = (
    <>
      {/** Tip škole */}
      <Select
        value={schoolType}
        onValueChange={(e) => handleSchoolTypeChange(e)}
      >
        <SelectTrigger className="w-full sm:w-auto">
          <SelectValue placeholder="Osnovna/Srednja" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OSNOVNA">Osnovna</SelectItem>
          <SelectItem value="SREDNJA">Srednja</SelectItem>
        </SelectContent>
      </Select>

      {/** Razred */}
      {schoolType && (
        <Select value={grade} onValueChange={(e) => handleGradeChange(e)}>
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="Razred" />
          </SelectTrigger>
          <SelectContent>
            {schoolType === 'OSNOVNA' &&
              Array.from({ length: 8 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}. razred
                </SelectItem>
              ))}
            {schoolType === 'SREDNJA' &&
              Array.from({ length: 4 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}. razred
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </>
  );

  return (
    <div className="bg-card flex flex-col items-center justify-between gap-x-2 gap-y-4 rounded-lg border p-4 shadow-sm sm:flex-row">
      <div className="flex w-full items-center justify-between gap-2">
        {/** Pretraga i desktop filteri */}
        <div className="relative flex items-center gap-2 sm:w-auto">
          {/** Pretraga  */}
          <Input
            className="w-full pl-10 shadow-none sm:w-[180px]"
            placeholder="Pretraži..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <SearchIcon size={20} className="absolute left-3 text-gray-500" />

          {/** Filteri desktop */}
          <div className="hidden items-center gap-2 sm:flex">
            {filterContent}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* Sortiranje */}
          <SortFilter />

          {/** Dugme za prikaz/sakrivanje filtera na mobilnim uređajima */}
          <Button
            variant={'outline'}
            size={'icon'}
            className="sm:hidden"
            onClick={toggleFilters}
          >
            {isFiltersOpen ? (
              <FilterXIcon size={20} />
            ) : (
              <FilterIcon size={20} />
            )}
          </Button>

          {(schoolType || searchTerm) && (
            <div className="hidden sm:inline">
              <ResetFilters handleResetFilters={handleResetFilters} />
            </div>
          )}
        </div>
      </div>

      {isFiltersOpen && (
        <div className="flex w-full items-center justify-between gap-2 sm:hidden">
          <div className="flex items-center gap-2 sm:hidden">
            {filterContent}
          </div>

          {(schoolType || searchTerm) && (
            <ResetFilters handleResetFilters={handleResetFilters} />
          )}
        </div>
      )}
    </div>
  );
};

const ResetFilters = ({
  handleResetFilters,
}: {
  handleResetFilters: () => void;
}) => (
  <TooltipItem
    trigger={
      <Button variant={'destructive'} onClick={handleResetFilters}>
        <XIcon />
        <span className="sm:hidden">Poništi</span>
      </Button>
    }
    content="Poništi filtere"
  />
);

export default Filters;
