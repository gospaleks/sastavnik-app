'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { refetchEssays } from '@/lib/services/refetchEssays';

type Props = {
  totalPages: number;
};

const PagePagination = ({ totalPages }: Props) => {
  const [offset, setOffset] = useQueryState(
    'offset',
    parseAsInteger.withDefault(1),
  );

  const handleOffsetChange = (value: number) => {
    setOffset(value);
    setTimeout(async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      refetchEssays();
    }, 0);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={offset === 1}
            onClick={() => handleOffsetChange(offset - 1)}
          >
            <ChevronLeft /> <span className="hidden sm:inline">Prethodna</span>
          </Button>
        </PaginationItem>

        {/** First Page */}
        {offset > 1 && (
          <PaginationItem>
            <Button variant="ghost" onClick={() => handleOffsetChange(1)}>
              1
            </Button>
          </PaginationItem>
        )}

        {/** Ellipsis */}
        {offset > 3 && <PaginationEllipsis />}

        {/** Previous */}
        {offset > 2 && (
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => handleOffsetChange(offset - 1)}
            >
              {offset - 1}
            </Button>
          </PaginationItem>
        )}

        {/** Current */}
        <PaginationItem>
          <Button variant="default">{offset}</Button>
        </PaginationItem>

        {/** Next */}
        {offset < totalPages && (
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => handleOffsetChange(offset + 1)}
            >
              {offset + 1}
            </Button>
          </PaginationItem>
        )}

        {/** Ellipsis */}
        {offset < totalPages - 2 && <PaginationEllipsis />}

        {/** Last Page */}
        {offset < totalPages - 1 && (
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={offset === totalPages}
              onClick={() => handleOffsetChange(totalPages)}
            >
              {totalPages}
            </Button>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            variant="ghost"
            disabled={offset === totalPages}
            onClick={() => handleOffsetChange(offset + 1)}
          >
            <span className="hidden sm:inline">Sledeća</span> <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
