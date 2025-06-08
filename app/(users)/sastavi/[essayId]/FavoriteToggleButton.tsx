'use client';

import { useTransition, useState } from 'react';

import toggleFavorite from '@/actions/essay/toggleFavorite';

import { Button } from '@/components/ui/button';
import { BookmarkIcon, Loader2Icon } from 'lucide-react';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

export function FavoriteToggleButton({
  essayId,
  initiallyFavorite,
}: {
  essayId: string;
  initiallyFavorite: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState(initiallyFavorite);

  const handleClick = () => {
    startTransition(async () => {
      try {
        const result = await toggleFavorite(essayId);

        if (result.success) {
          setIsFavorite((prev) => !prev);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <Button
      variant={'secondary'}
      className="w-full md:w-48"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2Icon className="animate-spin" />
        </>
      ) : isFavorite ? (
        <>
          <BookmarkFilledIcon /> Ukloni iz omiljenih
        </>
      ) : (
        <>
          <BookmarkIcon /> Dodaj u omiljene
        </>
      )}
    </Button>
  );
}
