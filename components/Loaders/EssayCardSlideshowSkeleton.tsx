import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import EssayCardSkeleton from '@/components/Loaders/EssayCardSkeleton';

const EssayCardSlideshowSkeleton = async () => {
  return (
    <Carousel
      className="my-4 w-full"
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="flex pl-2 lg:basis-1/2 lg:pl-4 xl:basis-1/3"
          >
            <div className="h-full w-full">
              <EssayCardSkeleton />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default EssayCardSlideshowSkeleton;
