import Link from 'next/link';

import { EssayWithAuthorCategoryAvg } from '@/lib/types';

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
import { ArrowRight, Clock } from 'lucide-react';

type Props = {
  essay: EssayWithAuthorCategoryAvg;
};

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 jer je 0-indexed
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year}. ${hours}:${minutes}`;
}

const EssayCard = ({ essay }: Props) => {
  const previewContent =
    essay.content.length > 400
      ? essay.content.slice(0, 400) + '...'
      : essay.content;

  const isUpdated = essay.updatedAt.getTime() !== essay.createdAt.getTime();
  const formattedDate = formatDate(
    isUpdated ? essay.updatedAt : essay.createdAt,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{essay.title} </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Kategorija: {essay.category.name} <br />
          {essay.schoolType === 'OSNOVNA'
            ? 'Osnovna škola'
            : 'Srednja škola'}, {essay.level}. razred
        </CardDescription>
        {/* TODO: Add {essay.averageRating} */}
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <p className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">
          {previewContent}
        </p>

        {/* TODO: Link ka npr /tag/ime-taga gde se prikazuju svi sastavi koji sadrze taj tag */}
        {essay.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {essay.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="hover:bg-accent cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col text-left text-sm text-gray-500">
            <span className="flex items-center gap-1 font-bold">
              <Clock className="h-4 w-4" />
              {isUpdated ? 'Ažuriran' : 'Kreiran'}
            </span>
            {formattedDate}
          </div>

          <div className="text-right text-sm text-gray-500">
            <span className="font-bold">Autor</span> <br />
            {essay.author.firstName || ''} {essay.author.lastName || ''}
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
