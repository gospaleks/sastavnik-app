import { EssayWithCategory } from '@/lib/types';
import Link from 'next/link';
import EssayDropdown from './EssayDropdown';
import { formatDate } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type Props = {
  essay: EssayWithCategory;
  canEdit: boolean | undefined;
};

const EssayCardInProfile = ({ essay, canEdit }: Props) => {
  const previewContent =
    essay.content.length > 180
      ? essay.content.slice(0, 180) + '...'
      : essay.content;

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
            <CardTitle className="text-base font-semibold text-gray-800 hover:underline">
              {essay.title}
            </CardTitle>
          </Link>

          {canEdit && (
            <div className="sm:hidden">
              <EssayDropdown essayId={essay.id} essayTitle={essay.title} />
            </div>
          )}
        </div>

        <CardDescription className="text-sm font-medium text-gray-600">
          Kategorija:{' '}
          <Link
            href={`/kategorije/${essay.category.name}`}
            className="text-gray-800 underline"
          >
            {essay.category.name}
          </Link>
        </CardDescription>

        <p className="text-sm text-gray-600 italic">{formattedDate}</p>
      </div>

      <Separator className="sm:hidden" />

      {/* Desna sekcija */}
      <CardContent className="flex w-full justify-between p-0 pt-2 sm:w-2/3 sm:pt-0">
        <p className="text-sm leading-relaxed text-gray-600">
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
