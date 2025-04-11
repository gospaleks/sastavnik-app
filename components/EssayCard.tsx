import Link from 'next/link';

import { EssayWithAuthorCategory } from '@/lib/types';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, Clock, Star, StarOffIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';

type Props = {
  essay: EssayWithAuthorCategory;
};

const EssayCard = ({ essay }: Props) => {
  const previewContent =
    essay.content.length > 400
      ? essay.content.slice(0, 400) + '...'
      : essay.content;

  // Samo createdAt prikazujemo jer se updatedAt promeni i kad se sastav oceni a ne kad ga autor izmeni
  const formattedDate = formatDate(essay.createdAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="cursor-pointer text-xl font-bold hover:underline">
          <Link href={`/sastavi/${essay.id}`}>{essay.title}</Link>
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Kategorija: {essay.category.name} <br />
          {essay.schoolType === 'OSNOVNA'
            ? 'Osnovna škola'
            : 'Srednja škola'}, {essay.level}. razred
          <br />
          <div className="mt-2 flex items-center gap-1 text-sm">
            {essay.averageRating !== 0 ? (
              <>
                <Star className="fill-current text-yellow-400" />
                {essay.averageRating.toFixed(1)}
              </>
            ) : (
              <StarOffIcon className="text-gray-400" />
            )}
            <span className="text-gray-400"> ({essay.ratingCount})</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <p className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">
          {previewContent}
        </p>

        {essay.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {essay.tags.map((tag, index) => (
              <Link href={`/tag/${tag}`} key={index}>
                <Badge
                  variant="outline"
                  className="hover:bg-accent cursor-pointer transition-colors"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col text-left text-sm text-gray-500">
            <span className="flex items-center gap-1 font-bold">
              <Clock className="h-4 w-4" />
              Objavljeno
            </span>
            {formattedDate}
          </div>

          <div className="text-right text-sm text-gray-500">
            <span className="font-bold">Autor</span>
            <br />
            <Link
              href={`/profil/${essay.authorId}`}
              className="hover:text-primary cursor-pointer underline transition-colors"
            >
              {essay.author.firstName || ''} {essay.author.lastName || ''}
            </Link>
          </div>
        </div>

        <Separator />

        <div className="flex w-full justify-end">
          <Link
            href={`/sastavi/${essay.id}`}
            className={buttonVariants({
              variant: 'secondary',
            })}
          >
            Pročitaj više
            <ArrowRight />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EssayCard;
