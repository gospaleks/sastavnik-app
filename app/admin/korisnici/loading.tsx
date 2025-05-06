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
        Korisnici
      </h1>

      <Table className="border">
        <TableCaption>Učitavanje korisnika...</TableCaption>
        <TableHeader className="">
          <TableRow>
            {['w-[120px]', '', '', '', ''].map((className, i) => (
              <TableHead key={i} className={className}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="w-[120px]">
                <Skeleton className="h-8 w-8 rounded-full" />
              </TableCell>
              <TableCell className="">
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
              <TableCell>
                <Skeleton className="h-6 w-6 rounded-lg text-right" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ContentWrapper>
  );
};

export default loading;
