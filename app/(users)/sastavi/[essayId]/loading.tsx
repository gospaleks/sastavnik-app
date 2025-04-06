import ContentWrapper from '@/components/ContentWrapper';
import { Loader2Icon } from 'lucide-react';

const LoadingEssayPage = () => {
  return (
    <ContentWrapper>
      <Loader2Icon className="animate-spin" />
    </ContentWrapper>
  );
};

export default LoadingEssayPage;
