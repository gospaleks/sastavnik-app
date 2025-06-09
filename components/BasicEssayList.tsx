import BasicEssayCard from './BasicEssayCard';
import InfoBox from './InfoBox';
import { EssayBasic } from '@/lib/types';

type Props = {
  essays: EssayBasic[];
  isGrid?: boolean;
};

const BasicEssayList = ({ essays, isGrid = false }: Props) => {
  return (
    <div
      className={
        isGrid
          ? 'mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
          : 'mt-2 flex flex-col gap-4'
      }
    >
      {essays.length > 0 ? (
        essays.map((essay) => <BasicEssayCard key={essay.id} essay={essay} />)
      ) : (
        <div className={isGrid ? 'col-span-full' : 'w-full'}>
          <InfoBox message="😔 Trenutno nema sastava za prikaz" />
        </div>
      )}
    </div>
  );
};

export default BasicEssayList;
