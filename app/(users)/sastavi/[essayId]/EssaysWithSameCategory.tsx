import BasicEssayList from '@/components/BasicEssayList';
import { getEssaysBasicByCategoryName } from '@/lib/services/essayService';
import React from 'react';

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

  return <BasicEssayList essays={essaysWithSameCategory} />;
};

export default EssaysWithSameCategory;
