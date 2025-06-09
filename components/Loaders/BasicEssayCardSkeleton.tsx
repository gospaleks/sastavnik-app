import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '../ui/separator';

const BasicEssayCardSkeleton = () => {
  return (
    <div className="space-y-2 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-32" /> {/* kategorija */}
        <Skeleton className="h-3 w-20" /> {/* datum */}
      </div>
      <Skeleton className="h-5 w-full" /> {/* Naslov */}
      <Skeleton className="my-4 h-3 w-3/4" /> {/* Kratak opis */}
      {/* <Separator /> */}
      <div className="flex justify-end">
        <Skeleton className="mt-2 h-7 w-32" /> {/* Procitaj vise */}
      </div>
    </div>
  );
};

export default BasicEssayCardSkeleton;
