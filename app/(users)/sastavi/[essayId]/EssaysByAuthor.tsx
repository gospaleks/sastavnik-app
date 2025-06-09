import { getEssaysBasicByAuthor } from '@/data/essay/getEssaysBasicByAuthor';
import BasicEssayList from '@/components/BasicEssayList';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type Props = {
  authorId: string;
  essayToSkipId: string;
};

const EssaysByAuthor = async ({ authorId, essayToSkipId }: Props) => {
  const otherEssaysByAuthor = (
    await getEssaysBasicByAuthor(authorId, 3)
  ).filter((essay) => essay.id !== essayToSkipId);

  return (
    <>
      <BasicEssayList essays={otherEssaysByAuthor} />
      {otherEssaysByAuthor.length > 0 && (
        <div className="mt-4 text-center md:text-left">
          <Link
            href={`/profil/${authorId}`}
            className={`${buttonVariants({ variant: 'link' })}`}
          >
            Vidi sve radove ovog autora
            <ArrowRight />
          </Link>
        </div>
      )}
    </>
  );
};

export default EssaysByAuthor;
