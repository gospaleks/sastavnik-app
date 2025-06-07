import ContentWrapper from '@/components/ContentWrapper';

import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <ContentWrapper>
      <h1 className="mb-4 text-center text-3xl font-extrabold tracking-tight">
        Komentari po sastavima
      </h1>

      <div>
        <Skeleton className="mb-2 h-20 w-full" />
        <Skeleton className="mb-2 h-20 w-full" />
        <Skeleton className="mb-2 h-20 w-full" />
        <Skeleton className="mb-2 h-20 w-full" />
      </div>

      <div className="mt-4 flex items-center justify-center">
        <span className="text-muted-foreground">Učitavanje komentara...</span>
      </div>
    </ContentWrapper>
  );
};

export default loading;
