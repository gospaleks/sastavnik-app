import { EssayWithCategory } from '@/lib/types';

import BasicEssayCard from '@/components/BasicEssayCard';
import InfoBox from '@/components/InfoBox';

import { BookmarkIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type Props = {
  userId: string; // TODO???: ako se resim da dodam brisanje odma iz kartice -> treba napraviti nove kartice
  essays: EssayWithCategory[];
};

const Favorites = ({ userId, essays }: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="omiljeni">
        <AccordionTrigger className="bg-accent flex w-full items-center rounded-lg px-4 py-2 sm:text-lg">
          <div className="flex items-center gap-2 font-normal">
            <BookmarkIcon />
            <span>Omiljeni sastavi ({essays.length})</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4">
          {essays.length > 0 ? (
            <div className="flex flex-col gap-4">
              {essays.map((essay) => (
                <BasicEssayCard key={essay.id} essay={essay} />
              ))}
            </div>
          ) : (
            <InfoBox message="Nemate omiljenih sastava." />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Favorites;
