import ContentWrapper from '@/components/ContentWrapper';
import EssaysByAuthorSkeleton from '@/components/Loaders/EssaysByAuthorSkeleton';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingEssayPage = () => {
  return (
    <ContentWrapper>
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Leva strana */}
        <div className="w-full space-y-2 md:w-8/12 md:space-y-4">
          {/* Placeholder za naslov */}
          <Skeleton className="mx-auto h-12 w-10/12 md:mx-0" />
          <Skeleton className="mx-auto mb-2 h-6 w-8/12 md:hidden" />

          {/* Placeholder za autora i datum */}
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <Skeleton className="h-4 w-32 md:mx-0" />
            <Skeleton className="hidden h-4 w-4 rounded-full md:block" />
            <Skeleton className="h-4 w-24 md:mx-0" />
          </div>

          {/* Placeholder za kategoriju i tip škole */}
          <div className="flex flex-col gap-2 md:flex-row">
            <Skeleton className="h-8 w-full md:w-48" />
            <Skeleton className="h-8 w-full md:w-32" />
          </div>

          {/* Placeholder za StarRating */}
          <div className="flex flex-col gap-2 md:flex-row">
            <Skeleton className="h-8 w-full md:w-32" />
            <Skeleton className="h-8 w-full md:w-48" />
            <Skeleton className="h-8 w-full md:w-48" />
          </div>

          {/* Placeholder za sadržaj */}
          <Skeleton className="mx-auto h-96 w-full" />

          {/* Placeholder za tagove */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-14" />
          </div>

          {/* Placeholder za komentare */}
          <div className="mt-8 space-y-4">
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        </div>

        {/* Desna strana: Placeholder za ostale sastave autora i kategorije */}
        <div className="flex w-full flex-col gap-8 md:w-4/12">
          {/* Placeholder za ostale sastave autora */}
          <div>
            <Skeleton className="mb-2 h-6 w-3/4 md:w-1/2" />
            <EssaysByAuthorSkeleton />
          </div>

          {/* Placeholder za sastave iz iste kategorije */}
          <div>
            <Skeleton className="mb-2 h-6 w-3/4 md:w-1/2" />
            <EssaysByAuthorSkeleton />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

const CommentAutorSkeleton = () => {
  return (
    <div className="flex items-start gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <CommentAutorSkeleton />
      <Skeleton className="mt-4 h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

export default LoadingEssayPage;
