import { Skeleton } from '@/components/ui/skeleton';

const BasicEssayCardSkeleton = () => {
  return (
    <div className="space-y-2 rounded-md p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Skeleton className="h-7 w-8" /> {/* Ikonica */}
        <Skeleton className="h-5 w-3/4" /> {/* Naslov */}
      </div>
      <Skeleton className="h-4 w-full" /> {/* Kratak tekst */}
      <div className="flex justify-end">
        <Skeleton className="h-4 w-24" /> {/* Procitaj vise */}
      </div>
    </div>
  );
};

export default BasicEssayCardSkeleton;
