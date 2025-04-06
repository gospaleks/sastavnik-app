import Link from 'next/link';
import { getEssaysBasicByAuthor } from '@/lib/services/essayService';

type Props = {
  authorId: string;
  essayToSkipId: string;
};

const EssaysByAuthor = async ({ authorId, essayToSkipId }: Props) => {
  const otherEssaysByAuthor = await getEssaysBasicByAuthor(
    authorId,
    essayToSkipId,
  );

  return (
    <div className="flex flex-col gap-4">
      {otherEssaysByAuthor.length > 0 ? (
        otherEssaysByAuthor.map((otherEssay) => (
          <Link
            href={`/sastavi/${otherEssay.id}`}
            key={otherEssay.id}
            className="cursor-pointer border-b py-2"
          >
            <h2 className="text-lg leading-tight font-semibold hover:underline">
              {otherEssay.title}
            </h2>
            <p className="text-muted-foreground text-xs">
              {otherEssay.content.slice(0, 70)}...
            </p>
            <p className="text-right text-sm text-blue-500 underline">
              Pročitaj više...
            </p>
          </Link>
        ))
      ) : (
        <p className="text-muted-foreground text-sm">
          😔 Trenutno nema drugih sastava ovog autora
        </p>
      )}
    </div>
  );
};

export default EssaysByAuthor;
