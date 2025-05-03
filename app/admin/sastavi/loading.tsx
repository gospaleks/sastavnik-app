import ContentWrapper from '@/components/ContentWrapper';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <ContentWrapper>
      <h1 className="mb-4 text-center text-3xl font-extrabold tracking-tight">
        Neobjavljeni sastavi
      </h1>

      <Table className="border">
        <TableCaption>Učitavanje sastava...</TableCaption>
        <TableHeader className="">
          <TableRow>
            {['w-[200px]', '', '', ''].map((className, i) => (
              <TableHead key={i} className={className}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="w-[200px]">
                <Skeleton className="h-4 w-3/4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-1/2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-2/3" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-1/4" />
              </TableCell>
              <TableCell className="flex items-center justify-end gap-2 text-right">
                <Skeleton className="h-8 w-20 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ContentWrapper>
  );
};

export default loading;
