import Link from 'next/link';
import { getLatestEssays } from '@/data/essay/getLatestEssays';

import BasicEssayList from '@/components/BasicEssayList';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const LatestEssays = async () => {
  const latestEssays = await getLatestEssays(6);

  return (
    <div>
      <BasicEssayList essays={latestEssays} isGrid={true} />

      <div className="flex justify-center">
        <Link
          href="/sastavi"
          className={buttonVariants({
            variant: 'link',
            className: 'mt-4',
          })}
        >
          Prikaži sve sastave
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default LatestEssays;
