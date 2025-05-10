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
import {
  ArrowRight,
  Clock,
  ExternalLinkIcon,
  Star,
  StarOffIcon,
  UserIcon,
} from 'lucide-react';
import { formatDate, getTextPreviewFromHtml } from '@/lib/utils';

type Props = {
  essay: EssayWithAuthorCategory;
};

const EssayCard = ({ essay }: Props) => {
  // Samo createdAt prikazujemo jer se updatedAt promeni i kad se sastav oceni a ne kad ga autor izmeni
  const formattedDate = formatDate(essay.createdAt);

  return (
    <Card className="transition-transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="cursor-pointer text-xl font-bold tracking-tight hover:underline">
          <Link href={`/sastavi/${essay.id}`}>{essay.title}</Link>
        </CardTitle>

        <CardDescription className="text-muted-foreground flex w-full flex-col gap-2 text-sm">
          <Link
            className="hover:text-primary hover:bg-accent cursor-pointer border-b p-2 transition-colors hover:rounded-md"
            href={`/kategorije/${essay.category.name}`}
          >
            Kategorija: {essay.category.name}
          </Link>

          <Link
            className="hover:text-primary hover:bg-accent cursor-pointer border-b p-2 transition-colors hover:rounded-md"
            href={`/sastavi?schoolType=${essay.schoolType}&grade=${essay.level}`}
          >
            {essay.schoolType === 'OSNOVNA' ? 'Osnovna škola' : 'Srednja škola'}
            , {essay.level}. razred
          </Link>

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
        <p className="text-sm whitespace-pre-line">
          {getTextPreviewFromHtml(essay.content, 300)}
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
          <div className="text-muted-foreground flex flex-col text-left text-sm">
            <span className="flex items-center gap-1 font-bold">
              <Clock size={16} />
              Objavljeno
            </span>
            {formattedDate}
          </div>

          <div className="text-muted-foreground flex flex-col items-end text-right text-sm">
            <span className="flex items-center gap-1 font-bold">
              Autor <UserIcon size={16} />
            </span>
            <br />
            {essay.author.email === 'anonimni korisnik' ? (
              <span>
                {essay.author.firstName || ''} {essay.author.lastName || ''}
              </span>
            ) : (
              <Link
                href={`/profil/${essay.authorId}`}
                className="hover:text-primary cursor-pointer underline transition-colors"
              >
                {essay.author.firstName || ''} {essay.author.lastName || ''}
              </Link>
            )}
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
