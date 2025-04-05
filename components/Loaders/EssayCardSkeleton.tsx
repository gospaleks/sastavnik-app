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
      <CardHeader>
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="mb-1 h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[70%]" />

        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex flex-col items-end">
            <Skeleton className="mb-1 h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
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
