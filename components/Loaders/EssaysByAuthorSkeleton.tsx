import { Skeleton } from '@/components/ui/skeleton';

const EssaysByAuthorSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2 border-b py-2">
          <Skeleton className="h-5 w-3/4" /> {/* Naslov */}
          <Skeleton className="h-4 w-full" /> {/* Kratak tekst */}
          <div className="flex justify-end">
            <Skeleton className="h-4 w-24" /> {/* Procitaj vise */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EssaysByAuthorSkeleton;
