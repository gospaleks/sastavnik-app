import Link from 'next/link';
import { EssayWithCategory } from '@/lib/types';
import { formatRelativeTime, getTextPreviewFromHtml } from '@/lib/utils';

import EssayDropdown from '@/components/EssayDropdown';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Props = {
  essay: EssayWithCategory;
  canEdit: boolean | undefined;
  isAdmin: boolean | undefined;
};

const EssayCardInProfile = ({ essay, canEdit, isAdmin }: Props) => {
  const previewContent = getTextPreviewFromHtml(essay.content, 180);

  const formattedDate = formatRelativeTime(essay.createdAt);

  return (
    <Card
      key={essay.id}
      className="relative flex flex-col items-start gap-4 p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:flex-row"
    >
      {/* Leva sekcija */}
      <div className="flex w-full flex-col gap-2 sm:w-1/3">
        <div className="flex flex-col gap-2">
          <Badge
            variant="secondary"
            className="bg-muted text-muted-foreground hover:bg-accent"
            asChild
          >
            <Link href={`/kategorije/${essay.category.name}`}>
              {essay.category.name}
            </Link>
          </Badge>

          <Link
            href={`/sastavi/${essay.id}`}
            className="flex items-center gap-2"
          >
            <CardTitle className="text-base font-semibold underline-offset-4 hover:underline">
              {essay.title}
            </CardTitle>
          </Link>
        </div>

        <span className="text-muted-foreground text-sm sm:mr-4">
          {formattedDate}
        </span>
      </div>

      <Separator className="w-full sm:hidden" />

      {/* Desna sekcija */}
      <CardContent className="flex w-full flex-col justify-between gap-2 p-0 sm:mr-12 sm:w-2/3">
        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
          {previewContent}
        </p>
        <div className="text-end">
          <Button
            variant={'secondary'}
            size={'sm'}
            className="sm:-mr-12"
            asChild
          >
            <Link href={`/sastavi/${essay.id}`}>
              Pročitaj više
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </CardContent>

      {canEdit && essay && (
        <div className="absolute top-4 right-4">
          <EssayDropdown essay={essay} isAdmin={isAdmin} />
        </div>
      )}
    </Card>
  );
};

export default EssayCardInProfile;
