import { EssayWithCategory } from '@/lib/types';
import Link from 'next/link';
import EssayDropdown from './EssayDropdown';
import { formatDate, getTextPreviewFromHtml } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ClockIcon } from 'lucide-react';

type Props = {
  essay: EssayWithCategory;
  canEdit: boolean | undefined;
};

const EssayCardInProfile = ({ essay, canEdit }: Props) => {
  const previewContent = getTextPreviewFromHtml(essay.content, 180);

  const formattedDate = formatDate(essay.createdAt);

  return (
    <Card
      key={essay.id}
      className="flex flex-col items-start gap-4 p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:flex-row"
    >
      {/* Leva sekcija */}
      <div className="flex w-full flex-col gap-2 sm:w-1/3 sm:border-r">
        <div className="flex w-full items-center justify-between">
          <Link
            href={`/sastavi/${essay.id}`}
            className="flex items-center gap-2"
          >
            <CardTitle className="text-base font-semibold hover:underline">
              {essay.title}
            </CardTitle>
          </Link>

          {canEdit && (
            <div className="sm:hidden">
              <EssayDropdown essayId={essay.id} essayTitle={essay.title} />
            </div>
          )}
        </div>

        <Link
          className="hover:text-primary hover:bg-accent flex cursor-pointer items-center gap-1 border-b p-2 text-sm transition-colors hover:rounded-md sm:mr-4 sm:text-xs"
          href={`/kategorije/${essay.category.name}`}
        >
          {essay.category.name}
          <ArrowRight size={15} />
        </Link>

        <span className="text-muted-foreground flex items-center gap-1 text-sm sm:mr-4">
          <ClockIcon size={15} />
          {formattedDate}
        </span>
      </div>

      {/* Desna sekcija */}
      <CardContent className="flex w-full justify-between p-0 pt-2 sm:w-2/3 sm:pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
          {previewContent}
        </p>
        {canEdit && (
          <div className="hidden sm:block">
            <EssayDropdown essayId={essay.id} essayTitle={essay.title} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EssayCardInProfile;
