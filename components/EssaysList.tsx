import { getEssays } from '@/lib/services/essayService';

import EssayCard from '@/components/EssayCard';
import PagePagination from '@/components/PagePagination';

type Props = {
  offset: number;
};

const EssaysList = async ({ offset }: Props) => {
  const { essays, totalEssays, totalPages } = await getEssays(offset);
  return (
    <>
      <div className="my-4">
        {essays.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {essays.map((essay) => (
              <EssayCard key={essay.id} essay={essay} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            📄 Trenutno nema sastava u ovoj kategoriji.
          </p>
        )}
      </div>

      <div className="py-4">
        <PagePagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default EssaysList;
