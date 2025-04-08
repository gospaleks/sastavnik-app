import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import ContentWrapper from '@/components/ContentWrapper';
import { EssayForm } from '@/components/Forms/EssayForm';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Dodaj Sastav',
};

const DodajSastavPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect('/api/auth/login');

  const categories = await prisma.category.findMany();

  return (
    <ContentWrapper>
      <div className="my-8">
        <EssayForm categories={categories} />
      </div>
    </ContentWrapper>
  );
};

export default DodajSastavPage;
