import Link from 'next/link';
import { getEssaysBasicByCategoryName } from '@/data/essay/getEssaysBasicByCategoryName';

import BasicEssayList from '@/components/BasicEssayList';

import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type Props = {
  categoryName: string;
  essayToSkipId: string;
};

const EssaysWithSameCategory = async ({
  categoryName,
  essayToSkipId,
}: Props) => {
  const essaysWithSameCategory = (
    await getEssaysBasicByCategoryName(categoryName, 5)
  ).filter((essay) => essay.id !== essayToSkipId);

  return (
    <>
      <BasicEssayList essays={essaysWithSameCategory} />
      {essaysWithSameCategory.length > 0 && (
        <div className="mt-4 text-center md:text-left">
          <Link
            href={`/kategorije/${categoryName}`}
            className={`${buttonVariants({ variant: 'link' })}`}
          >
            Vidi sve iz ove kategorije
            <ArrowRight />
          </Link>
        </div>
      )}
    </>
  );
};

export default EssaysWithSameCategory;
