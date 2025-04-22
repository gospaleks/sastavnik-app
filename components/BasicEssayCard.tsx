import Link from 'next/link';
import { FileTextIcon } from 'lucide-react';
import { getTextPreviewFromHtml } from '@/lib/utils';

type Props = {
  essay: {
    id: string;
    title: string;
    content: string;
  };
};

const BasicEssayCard = ({ essay }: Props) => {
  return (
    <Link
      href={`/sastavi/${essay.id}`}
      className="flex w-full flex-col items-start rounded-sm bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-start gap-1">
            <FileTextIcon className="text-blue-500" />
            <h2 className="text-md font-semibold text-gray-800 hover:underline">
              {essay.title}
            </h2>
          </div>

          <p className="text-sm text-gray-500">
            {getTextPreviewFromHtml(essay.content, 80)}
          </p>
        </div>
      </div>

      <div className="ml-auto text-sm text-blue-500 hover:underline">
        Pročitaj više...
      </div>
    </Link>
  );
};

export default BasicEssayCard;
