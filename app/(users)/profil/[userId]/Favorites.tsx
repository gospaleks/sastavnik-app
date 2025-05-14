'use client';

import { useState } from 'react';
import { EssayWithCategory } from '@/lib/types';

import BasicEssayCard from '@/components/BasicEssayCard';

import { BookmarkIcon, ChevronDown, ChevronUp, Edit3Icon } from 'lucide-react';
import TooltipItem from '@/components/TooltipItem';
import { Button } from '@/components/ui/button';

type Props = {
  userId: string;
  essays: EssayWithCategory[];
};

const Favorites = ({ userId, essays }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="bg-accent flex w-full items-center justify-between gap-2 rounded-lg border px-4 py-2 text-sm sm:text-lg">
        <div className="flex items-center gap-2">
          <BookmarkIcon />
          <span>Omiljeni sastavi ({essays.length})</span>
        </div>
        <div
          className="hover:bg-muted rounded-md p-1 transition-colors"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <TooltipItem
              trigger={<ChevronUp />}
              content="Sakrij omiljene sastave"
            />
          ) : (
            <TooltipItem
              trigger={<ChevronDown />}
              content="Prikaži omiljene sastave"
            />
          )}
        </div>
      </div>
      {show && (
        <>
          {essays.length > 0 ? (
            essays.map((essay) => (
              <BasicEssayCard key={essay.id} essay={essay} />
            ))
          ) : (
            <div className="text-muted-foreground text-center text-sm">
              Nemate omiljenih sastava.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Favorites;
