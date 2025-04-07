import { getEssaysByPopularity } from '@/lib/services/essayService';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import EssayCard from '@/components/EssayCard';

const PopularEssaysSlideShow = async () => {
  const popularEssays = await getEssaysByPopularity();

  return (
    <Carousel
      className="my-4 w-full"
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent className="-ml-1">
        {popularEssays.map((essay) => (
          <CarouselItem
            key={essay.id}
            className="flex pl-2 lg:basis-1/2 lg:pl-4 xl:basis-1/3"
          >
            <EssayCard essay={essay} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-0 z-10 -translate-y-1/2 transform rounded-full bg-black p-2 text-white" />
      <CarouselNext className="absolute top-1/2 right-0 z-10 -translate-y-1/2 transform rounded-full bg-black p-2 text-white" />
    </Carousel>
  );
};

export default PopularEssaysSlideShow;
