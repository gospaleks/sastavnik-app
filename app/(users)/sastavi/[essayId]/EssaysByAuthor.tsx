import { getEssaysBasicByAuthor } from '@/lib/services/essayService';
import BasicEssayList from '@/components/BasicEssayList';

type Props = {
  authorId: string;
  essayToSkipId: string;
};

const EssaysByAuthor = async ({ authorId, essayToSkipId }: Props) => {
  const otherEssaysByAuthor = (
    await getEssaysBasicByAuthor(authorId, 5)
  ).filter((essay) => essay.id !== essayToSkipId);

  return <BasicEssayList essays={otherEssaysByAuthor} />;
};

export default EssaysByAuthor;
