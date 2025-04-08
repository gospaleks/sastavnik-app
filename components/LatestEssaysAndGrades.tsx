import Link from 'next/link';
import { getLatestEssays } from '@/lib/services/essayService';
import BasicEssayList from '@/components/BasicEssayList';

const LatestEssays = async () => {
  const latestEssays = await getLatestEssays(3);

  return (
    <div className="mx-auto max-w-4xl">
      <BasicEssayList essays={latestEssays} />

      <Link
        href="/sastavi"
        className="mt-4 block text-center text-blue-500 underline"
      >
        Prikaži sve sastave
      </Link>
    </div>
  );
};

export default LatestEssays;
