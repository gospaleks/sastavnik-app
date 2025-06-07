import BasicEssayCardSkeleton from './BasicEssayCardSkeleton';

const EssaysByAuthorSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <BasicEssayCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default EssaysByAuthorSkeleton;
