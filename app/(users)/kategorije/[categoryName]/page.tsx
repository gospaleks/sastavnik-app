import ContentWrapper from '@/components/ContentWrapper';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const { categoryName } = await params;
  const decodedCategoryName = decodeURIComponent(categoryName);
  return {
    title: `Kategorija - ${decodedCategoryName}`,
  };
}

export const KategorijePage = async ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = await params;
  const decodedCategoryName = decodeURIComponent(categoryName);

  return (
    <ContentWrapper>
      <div>
        <h1 className="text-2xl">
          Kategorija: <span className="font-bold">{decodedCategoryName}</span>
        </h1>
      </div>
    </ContentWrapper>
  );
};

export default KategorijePage;
