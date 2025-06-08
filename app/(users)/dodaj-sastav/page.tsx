import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { getAllCategories } from '@/data/category/getAllCategories';

import { TooltipProvider } from '@/components/ui/tooltip';
import ContentWrapper from '@/components/ContentWrapper';
import { EssayForm } from '@/components/Forms/EssayForm';

export const metadata = {
  title: 'Dodaj Sastav',
};

const DodajSastavPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  const categories = await getAllCategories();

  return (
    <ContentWrapper>
      <div className="my-4">
        <TooltipProvider>
          <EssayForm categories={categories} isLoggedIn={isLoggedIn} />
        </TooltipProvider>
      </div>
    </ContentWrapper>
  );
};

export default DodajSastavPage;
