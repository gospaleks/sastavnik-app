'use client';

import { useCallback } from 'react';

import { parseAsInteger, useQueryState } from 'nuqs';

import { debounce } from 'lodash';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { refetchEssays } from '@/lib/services/refetchEssays';
import { Button } from './ui/button';
import { SearchIcon, XIcon } from 'lucide-react';

const Filters = () => {
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
    setSearchTerm(value);
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

  return (
    <div className="flex flex-col items-center justify-between gap-2 rounded-lg border p-4 shadow-sm sm:flex-row">
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        {/** Pretraga */}
        <div className="relative flex items-center sm:w-auto">
          <Input
            className="w-[180px] pl-10 shadow-none"
            placeholder="Pretraži..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <SearchIcon size={20} className="absolute left-3 text-gray-500" />
        </div>

        {/** Tip škole */}
        <Select
          value={schoolType}
          onValueChange={(e) => handleSchoolTypeChange(e)}
        >
          <SelectTrigger className="w-full sm:w-[160px]">
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
            <SelectTrigger className="w-full sm:w-[120px]">
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
      </div>

      {/** Resetovanje filtera */}
      {(schoolType || searchTerm) && (
        <Button
          variant={'destructive'}
          className="cursor-pointer"
          onClick={handleResetFilters}
        >
          <XIcon />
          Poništi
        </Button>
      )}
    </div>
  );
};

export default Filters;
