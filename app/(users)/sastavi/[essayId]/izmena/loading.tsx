import ContentWrapper from '@/components/ContentWrapper';
import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <ContentWrapper>
      <div className="my-4">
        <div className="flex flex-col space-y-4 rounded-lg p-0 sm:border sm:p-8 sm:shadow-sm">
          <h1 className="flex gap-2 text-2xl font-bold">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-32" />
          </h1>

          {/* tema, kategorija, tip skole, razred */}
          <div className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
            <div className="flex-1/3 space-y-4">
              <div className="space-y-1">
                <Skeleton className="h-4 w-1/8" />
                <Skeleton className="h-8 w-full" />
              </div>

              <div className="space-y-1">
                <Skeleton className="h-4 w-2/8" />
                <Skeleton className="h-8 w-full" />
              </div>

              <div className="space-y-1">
                <Skeleton className="h-4 w-1/8" />
                <Skeleton className="h-8 w-full" />
              </div>

              <div className="space-y-1">
                <Skeleton className="h-4 w-2/12" />
                <Skeleton className="h-8 w-full" />
              </div>

              <div className="space-y-1">
                <Skeleton className="h-4 w-1/8" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-8" />
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-1/12" />
                  <Skeleton className="h-4 w-2/12" />
                  <Skeleton className="h-4 w-1/12" />
                  <Skeleton className="h-4 w-1/12" />
                </div>
              </div>
            </div>

            {/* tekst editor i submit dugme */}
            <div className="w-full flex-2/3 space-y-4">
              <div className="space-y-1">
                <Skeleton className="h-4 w-1/8" />
                <Skeleton className="h-64 w-full" />
              </div>

              <Skeleton className="h-8 w-full" />
            </div>
          </div>

          {/* alert kartica */}
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default loading;
