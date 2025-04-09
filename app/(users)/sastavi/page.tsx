import { getEssays } from '@/lib/services/essayService';

import { loadSearchParams } from '@/lib/searchParams';
import { SearchParams } from 'nuqs/server';

import ContentWrapper from '@/components/ContentWrapper';
import EssayCard from '@/components/EssayCard';
import PagePagination from '@/components/PagePagination';

export const metadata = {
  title: 'Svi sastavi',
};

type Props = {
  searchParams: Promise<SearchParams>;
};

const AllEssaysPage = async ({ searchParams }: Props) => {
  const { offset } = await loadSearchParams(searchParams);

  const { essays, totalEssays, totalPages } = await getEssays(offset);

  return (
    <ContentWrapper>
      <h1 className="text-primary mb-8 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
        Svi sastavi ({totalEssays})
      </h1>

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
    </ContentWrapper>
  );
};

export default AllEssaysPage;
