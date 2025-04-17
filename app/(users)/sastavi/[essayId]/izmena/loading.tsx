import ContentWrapper from '@/components/ContentWrapper';
import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <ContentWrapper>
      <div className="my-8">
        <div className="mx-auto flex max-w-2xl flex-col space-y-4 rounded-lg p-0 sm:border sm:p-8 sm:shadow-sm">
          <h1 className="text-2xl font-bold">
            <Skeleton className="h-8 w-1/3" />
          </h1>

          <div className="space-y-1">
            <Skeleton className="h-4 w-1/8" />
            <Skeleton className="h-8 w-full" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-1/8" />
            <Skeleton className="h-8 w-2/8" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-1/8" />
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Skeleton className="h-14 w-full rounded-2xl sm:w-1/2" />
              <Skeleton className="h-14 w-full rounded-2xl sm:w-1/2" />
            </div>
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-1/12" />
            <Skeleton className="h-8 w-2/12" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-1/8" />
            <Skeleton className="h-8 w-full" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-1/12" />
              <Skeleton className="h-4 w-2/12" />
              <Skeleton className="h-4 w-1/12" />
              <Skeleton className="h-4 w-1/12" />
            </div>
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-1/8" />
            <Skeleton className="h-40 w-full" />
          </div>

          <Skeleton className="h-8 w-full" />

          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default loading;
