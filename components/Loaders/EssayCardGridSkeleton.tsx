import EssayCardSkeleton from '@/components/Loaders/EssayCardSkeleton';

type Props = {
  columns?: number;
};

const EssayCardGridSkeleton = ({ columns }: Props) => {
  return (
    <div className={`my-4 grid grid-cols-1 gap-4 md:grid-cols-${columns ?? 2}`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <EssayCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default EssayCardGridSkeleton;
