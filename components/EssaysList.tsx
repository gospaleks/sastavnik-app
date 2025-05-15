import { getEssays } from '@/lib/services/essayService';

import InfoBox from '@/components/InfoBox';
import EssayCard from '@/components/EssayCard';
import PagePagination from '@/components/PagePagination';

type Props = {
  page: number;
  searchTerm: string;
  schoolType: string;
  grade: string;
  sort: string;
};

const EssaysList = async ({
  page,
  searchTerm,
  schoolType,
  grade,
  sort,
}: Props) => {
  const { essays, totalEssays, totalPages } = await getEssays(
    page,
    searchTerm,
    schoolType,
    grade,
    sort,
  );

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
          <InfoBox message="Nijedan sastav nije pronađen. Pokušajte da promenite filtere." />
        )}
      </div>

      {totalPages > 0 && (
        <div className="mt-4 flex justify-center">
          <PagePagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
};

export default EssaysList;
