import Link from 'next/link';
import { getEssaysBasicByCategoryName } from '@/lib/services/essayService';

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
    await getEssaysBasicByCategoryName(categoryName)
  ).filter((essay) => essay.id !== essayToSkipId);

  return (
    <>
      <BasicEssayList essays={essaysWithSameCategory} />
      {essaysWithSameCategory.length > 0 && (
        <Link
          href={`/kategorije/${categoryName}`}
          className={`${buttonVariants({ variant: 'link' })} mt-4`}
        >
          Vidi sve iz ove kategorije
          <ArrowRight />
        </Link>
      )}
    </>
  );
};

export default EssaysWithSameCategory;
