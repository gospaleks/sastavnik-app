import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const EssayCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-8" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-8" />
          <Skeleton className="h-5 w-8" />
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-3">
        <Skeleton className="mb-8 h-6 w-[80%]" />

        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[70%]" />

        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Separator />

        <div className="flex w-full justify-end">
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default EssayCardSkeleton;
