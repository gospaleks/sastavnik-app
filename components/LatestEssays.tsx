import Link from 'next/link';
import { getLatestEssays } from '@/lib/services/essayService';
import BasicEssayList from '@/components/BasicEssayList';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from './ui/button';

const LatestEssays = async () => {
  const latestEssays = await getLatestEssays(3);

  return (
    <div className="mx-auto max-w-4xl">
      <BasicEssayList essays={latestEssays} />

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
