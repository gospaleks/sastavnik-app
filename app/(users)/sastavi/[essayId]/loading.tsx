import ContentWrapper from '@/components/ContentWrapper';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingEssayPage = () => {
  return (
    <ContentWrapper>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full space-y-2 md:w-8/12">
          {/* Placeholder za naslov */}
          <Skeleton className="mx-auto h-12 w-10/12 md:mx-0" />

          {/* Placeholder za autora i datum */}
          <div className="space-y-2">
            <Skeleton className="mx-auto h-4 w-1/2 md:mx-0" />
            <Skeleton className="mx-auto h-4 w-1/4 md:mx-0" />
          </div>

          {/* Placeholder za kategoriju i tip škole */}
          <div className="flex flex-col gap-2 md:flex-row">
            <Skeleton className="h-8 w-full md:w-48" />
            <Skeleton className="h-8 w-full md:w-32" />
          </div>

          {/* Placeholder za StarRating */}
          <div className="flex flex-col gap-2 md:flex-row">
            <Skeleton className="h-6 w-full md:w-32" />
            <Skeleton className="h-6 w-full md:w-48" />
          </div>

          {/* Placeholder za sadržaj */}
          <Skeleton className="mx-auto h-48 w-full" />

          {/* Placeholder za tagove */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>

          {/* Placeholder za alert */}
          <Skeleton className="mt-4 h-16 w-full" />
        </div>

        {/* Desna strana: Placeholder za ostale sastave autora i kategorije */}
        <div className="flex w-full flex-col gap-8 md:w-4/12">
          {/* Placeholder za ostale sastave autora */}
          <div>
            <Skeleton className="h-6 w-3/4 md:w-1/2" />
            <Skeleton className="mt-2 h-32 w-full" />
          </div>

          {/* Placeholder za sastave iz iste kategorije */}
          <div>
            <Skeleton className="h-6 w-3/4 md:w-1/2" />
            <Skeleton className="mt-2 h-32 w-full" />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default LoadingEssayPage;
