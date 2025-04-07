import ContentWrapper from '@/components/ContentWrapper';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tagName: string }>;
}) {
  const { tagName } = await params;
  const decodedTagName = decodeURIComponent(tagName);

  return {
    title: `Tag - ${decodedTagName}`,
  };
}

const TagPage = async ({
  params,
}: {
  params: Promise<{ tagName: string }>;
}) => {
  const { tagName } = await params;
  const decodedTagName = decodeURIComponent(tagName);

  return (
    <ContentWrapper>
      <h1>Tag: {decodedTagName}</h1>
    </ContentWrapper>
  );
};

export default TagPage;
