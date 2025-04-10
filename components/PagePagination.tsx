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
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const handlePageChange = (value: number) => {
    setPage(value);
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
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeft /> <span className="hidden sm:inline">Prethodna</span>
          </Button>
        </PaginationItem>

        {/** First Page */}
        {page > 1 && (
          <PaginationItem>
            <Button variant="ghost" onClick={() => handlePageChange(1)}>
              1
            </Button>
          </PaginationItem>
        )}

        {/** Ellipsis */}
        {page > 3 && <PaginationEllipsis />}

        {/** Previous */}
        {page > 2 && (
          <PaginationItem>
            <Button variant="ghost" onClick={() => handlePageChange(page - 1)}>
              {page - 1}
            </Button>
          </PaginationItem>
        )}

        {/** Current */}
        <PaginationItem>
          <Button variant="default">{page}</Button>
        </PaginationItem>

        {/** Next */}
        {page < totalPages && (
          <PaginationItem>
            <Button variant="ghost" onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </Button>
          </PaginationItem>
        )}

        {/** Ellipsis */}
        {page < totalPages - 2 && <PaginationEllipsis />}

        {/** Last Page */}
        {page < totalPages - 1 && (
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={page === totalPages}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            variant="ghost"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            <span className="hidden sm:inline">Sledeća</span> <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
