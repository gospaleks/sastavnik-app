import ContentWrapper from '@/components/ContentWrapper';
import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <ContentWrapper>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="w-full md:w-8/12">
          <Skeleton className="mb-4 h-11 w-full" />
          <div className="flex flex-col gap-4">
            <Skeleton className="mb-2 h-28 w-full rounded-2xl" />
            <Skeleton className="mb-2 h-28 w-full rounded-2xl" />
            <Skeleton className="mb-2 h-28 w-full rounded-2xl" />
            <Skeleton className="mb-2 h-28 w-full rounded-2xl" />
          </div>
        </div>

        <div className="w-full md:w-4/12">
          <Skeleton className="mb-4 h-11 w-full" />
          <div className="mb-4">
            <div className="flex flex-col items-center justify-center p-6">
              <Skeleton className="mb-2 h-24 w-24 rounded-full" />
              <Skeleton className="mb-2 h-8 w-1/2" />
            </div>
            <div className="flex items-center justify-between px-6">
              <Skeleton className="mb-2 h-4 w-1/4" />
              <Skeleton className="mb-2 h-8 w-8 rounded-full" />
            </div>
            <div className="px-6 py-2">
              <Skeleton className="mb-2 h-32 w-full" />
            </div>
          </div>

          {/** Omiljeni sastavi */}
          <Skeleton className="mb-4 h-11 w-full" />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default loading;
