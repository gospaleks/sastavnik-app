'use client';

import { useEffect, useState } from 'react';
import { rateEssay } from '@/actions/rateEssay';
import { cn } from '@/lib/utils';
import { Loader2, Loader2Icon, Star } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  essayId: string;
  isLoggedIn: boolean;
  usersRating: number | undefined;
  averageInit: number;
  ratingCountInit: number | null;
};

export default function StarRating({
  essayId,
  isLoggedIn,
  usersRating,
  averageInit,
  ratingCountInit,
}: Props) {
  const [rating, setRating] = useState(usersRating || 0);
  const [hovered, setHovered] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [average, setAverage] = useState(averageInit);
  const [ratingCount, setRatingCount] = useState(ratingCountInit);

  const handleClick = async (value: number) => {
    if (isLoading) return;

    const previousRating = rating;
    setRating(value);

    try {
      setIsLoading(true);
      const { newAverageRating, newRatingCount } = await rateEssay(
        essayId,
        value,
      );
      setAverage(newAverageRating);
      setRatingCount(newRatingCount);
    } catch (error) {
      console.error('Error rating essay:', error);
      setRating(previousRating); // Vrati na proslo stanje
      toast.error(
        'Došlo je do greške prilikom ocenjivanja sastava. Pokušajte ponovo kasnije.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row md:items-start">
      <div className="bg-muted text-muted-foreground w-full rounded-md px-3 py-2 text-sm md:w-fit">
        {average !== 0 ? (
          <>
            <span className="text-primary font-semibold">Prosečna ocena:</span>{' '}
            <span className="text-lg font-bold text-yellow-500">
              {average.toFixed(1)}
            </span>
            <span className="text-muted-foreground ml-1 text-xs">
              ({ratingCount})
            </span>
          </>
        ) : (
          <span className="text-muted-foreground italic">
            Još uvek nema ocena za ovaj sastav.
          </span>
        )}
      </div>

      {isLoggedIn && (
        <div className="bg-muted text-muted-foreground flex w-full items-center gap-4 rounded-md px-3 py-2 text-sm md:w-fit">
          <div className="flex items-center gap-1">
            <span className="text-primary font-semibold">Vaša ocena:</span>{' '}
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={cn(
                  'transition-colors',
                  (hovered || rating) >= star
                    ? 'text-yellow-400'
                    : 'text-gray-400',
                )}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => handleClick(star)}
                disabled={isLoading}
              >
                <Star className="h-10 w-10 fill-current md:h-7 md:w-7" />
              </button>
            ))}
          </div>

          {isLoading && <Loader2Icon className="animate-spin text-gray-400" />}
        </div>
      )}
    </div>
  );
}
