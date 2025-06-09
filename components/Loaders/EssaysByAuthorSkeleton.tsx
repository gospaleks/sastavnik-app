import BasicEssayCardSkeleton from './BasicEssayCardSkeleton';

const EssaysByAuthorSkeleton = () => {
  return (
    <div className="mt-2 flex flex-col gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <BasicEssayCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default EssaysByAuthorSkeleton;
