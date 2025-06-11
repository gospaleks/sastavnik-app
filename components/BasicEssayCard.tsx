import Link from 'next/link';
import { ArrowRight, StarOffIcon } from 'lucide-react';
import { formatRelativeTime, getTextPreviewFromHtml } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { EssayBasic } from '@/lib/types';
import { Badge } from './ui/badge';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { Separator } from './ui/separator';

type Props = {
  essay: EssayBasic;
};

const BasicEssayCard = ({ essay }: Props) => {
  const relativeDate = formatRelativeTime(essay.createdAt);

  return (
    <>
      <Card className="hover:border-primary gap-4 p-4 transition-colors">
        <CardHeader className="flex items-center justify-between gap-3 p-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground hover:bg-accent"
              asChild
            >
              <Link href={`/kategorije/${essay.category.name}`}>
                {essay.category.name}
              </Link>
            </Badge>
            <span className="text-muted-foreground text-xs">
              {relativeDate}
            </span>
          </div>
          <>
            {essay.averageRating ? (
              <div className="flex items-center">
                <StarFilledIcon className="h-4 w-4 text-yellow-500" />
                <span className="text-muted-foreground ml-1 text-sm">
                  {essay.averageRating.toFixed(1)}
                </span>
              </div>
            ) : (
              <StarOffIcon className="text-muted-foreground h-4 w-4" />
            )}
          </>
        </CardHeader>

        <CardContent className="text-muted-foreground p-0 text-sm">
          <Link href={`/sastavi/${essay.id}`}>
            <h2 className="text-foreground text-lg leading-tight font-semibold tracking-tight underline-offset-4 hover:underline">
              {essay.title}
            </h2>
          </Link>
          <p className="mt-1 text-sm">
            {getTextPreviewFromHtml(essay.content, 80)}
          </p>
        </CardContent>

        <Separator />

        <CardFooter className="flex w-full justify-end p-0">
          <Button variant={'secondary'} size={'sm'} asChild>
            <Link href={`/sastavi/${essay.id}`}>
              Pročitaj više
              <ArrowRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default BasicEssayCard;
