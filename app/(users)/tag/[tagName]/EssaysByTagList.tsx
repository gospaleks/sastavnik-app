import { getEssaysByTagName } from '@/data/essay/getEssaysByTagName';

import EssayCard from '@/components/EssayCard';
import InfoBox from '@/components/InfoBox';

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
        <InfoBox message="📄 Trenutno nema sastava sa ovim tagom." />
      )}
    </div>
  );
};

export default EssaysByTagList;
