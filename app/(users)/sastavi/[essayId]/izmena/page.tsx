import { notFound, redirect } from 'next/navigation';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { canEditEssay, getEssayById } from '@/lib/services/essayService';
import { getAllCategories } from '@/lib/services/categoryService';

import ContentWrapper from '@/components/ContentWrapper';
import { EssayForm } from '@/components/Forms/EssayForm';
import { TooltipProvider } from '@radix-ui/react-tooltip';

type Props = {
  params: { essayId: string };
};

export default async function EditEssayPageasync({
  params,
}: {
  params: Promise<{ essayId: string }>;
}) {
  const { essayId } = await params;
  const { isAuthenticated, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect('/');

  const user = await getUser();
  if (!user) redirect('/');

  // Proverava da li je korisnik autor sastava ili admin
  const canEdit = await canEditEssay(essayId);
  if (!canEdit) redirect('/');

  const essay = await getEssayById(essayId);
  const categories = await getAllCategories();

  if (!essay) {
    return notFound();
  }

  return (
    <ContentWrapper>
      <div className="my-4">
        <TooltipProvider>
          <EssayForm
            essay={essay}
            categories={categories}
            isLoggedIn={isLoggedIn}
          />
        </TooltipProvider>
      </div>
    </ContentWrapper>
  );
}
