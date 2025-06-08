import { getEssaysByCategoryName } from '@/data/essay/getEssaysByCategoryName';

import PagePagination from '@/components/PagePagination';
import EssayCard from '@/components/EssayCard';
import InfoBox from '@/components/InfoBox';

type Props = {
  categoryName: string;
  page?: number;
  sort?: string;
};

const EssaysByCategoryList = async ({ categoryName, page, sort }: Props) => {
  const { essays, totalPages } = await getEssaysByCategoryName(
    categoryName,
    page,
    sort,
  );

  return (
    <div className="my-4">
      {essays.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {essays.map((essay) => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>
      ) : (
        <InfoBox message="📄 Trenutno nema sastava u ovoj kategoriji." />
      )}

      {totalPages > 0 && (
        <div className="mt-4 flex justify-center">
          <PagePagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default EssaysByCategoryList;
