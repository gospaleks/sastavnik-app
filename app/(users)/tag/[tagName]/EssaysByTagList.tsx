import EssayCard from '@/components/EssayCard';
import { getEssaysByTagName } from '@/lib/services/essayService';
import React from 'react';

type Props = {
  tagName: string;
};

const EssaysByTagList = async ({ tagName }: Props) => {
  const essayList = await getEssaysByTagName(tagName);

  return (
    <div className="my-4">
      {essayList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {essayList.map((essay) => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          📄 Trenutno nema sastava u ovoj kategoriji.
        </p>
      )}
    </div>
  );
};

export default EssaysByTagList;
