import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { getAllCategories } from '@/lib/services/categoryService';

import { TooltipProvider } from '@/components/ui/tooltip';
import ContentWrapper from '@/components/ContentWrapper';
import { EssayForm } from '@/components/Forms/EssayForm';

export const metadata = {
  title: 'Dodaj Sastav',
};

const DodajSastavPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect('/api/auth/login');

  const categories = await getAllCategories();

  return (
    <ContentWrapper>
      <div className="my-4">
        <TooltipProvider>
          <EssayForm categories={categories} />
        </TooltipProvider>
      </div>
    </ContentWrapper>
  );
};

export default DodajSastavPage;
