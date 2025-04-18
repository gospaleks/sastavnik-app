'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import { refetchEssays } from '@/lib/services/refetchEssays';

import TooltipItem from '@/components/TooltipItem';

import { Button } from '@/components/ui/button';
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';

const SortFilter = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [sort, setSort] = useQueryState('sort', {
    defaultValue: 'desc',
  });

  const handleSortChange = (value: string) => {
    setSort(value);
    setTimeout(() => {
      refetchEssays();
    }, 0);
    setPage(1);
  };

  return (
    <TooltipItem
      trigger={
        <Button
          variant="outline"
          onClick={() => handleSortChange(sort === 'desc' ? 'asc' : 'desc')}
          className="w-auto"
        >
          {sort === 'desc' ? (
            <>
              <ArrowDownWideNarrow className="h-4 w-4" />
              <span className="sm:hidden lg:inline">Najnoviji</span>
            </>
          ) : (
            <>
              <ArrowUpWideNarrow className="h-4 w-4" />
              <span className="sm:hidden lg:inline">Najstariji</span>
            </>
          )}
        </Button>
      }
      content="Sortiraj po datumu objave"
    />
  );
};

export default SortFilter;
