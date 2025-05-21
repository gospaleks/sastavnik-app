import Link from 'next/link';
import BasicEssayCard from './BasicEssayCard';
import InfoBox from './InfoBox';

type Props = {
  essays: {
    id: string;
    title: string;
    content: string;
  }[];
};

const BasicEssayList = ({ essays }: Props) => {
  return (
    <div className="mt-2 flex flex-col gap-4">
      {essays.length > 0 ? (
        essays.map((essay) => <BasicEssayCard key={essay.id} essay={essay} />)
      ) : (
        <InfoBox message="😔 Trenutno nema sastava za prikaz" />
      )}
    </div>
  );
};

export default BasicEssayList;
