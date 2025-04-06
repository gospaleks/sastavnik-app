import { getEssaysByCategoryName } from '@/lib/services/essayService';
import EssayCard from '@/components/EssayCard';

type Props = {
  categoryName: string;
};

const EssaysByCategoryList = async ({ categoryName }: Props) => {
  const essayList = await getEssaysByCategoryName(categoryName);

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

export default EssaysByCategoryList;
