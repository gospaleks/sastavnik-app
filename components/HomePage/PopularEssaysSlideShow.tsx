import { getEssaysByPopularity } from '@/data/essay/getEssaysByPopularity';

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

  if (popularEssays.length === 0) {
    return (
      <p className="text-muted my-4 text-center">
        Trenutno nema sastava za prikaz.
      </p>
    );
  }

  return (
    <Carousel
      className="my-4 w-full"
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent className="-ml-1 lg:-ml-4">
        {popularEssays.map((essay) => (
          <CarouselItem
            key={essay.id}
            className="flex p-2 pl-2 lg:basis-1/2 lg:pl-4 xl:basis-1/3"
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
