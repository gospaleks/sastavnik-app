import { notFound, redirect } from 'next/navigation';

import { getAllCategories } from '@/data/category/getAllCategories';
import { canUserEditEssay } from '@/data/essay/canUserEditEssay';
import { getEssayById } from '@/data/essay/getEssayById';
import { requireUser } from '@/data/user/requireUser';

import ContentWrapper from '@/components/ContentWrapper';
import { EssayForm } from '@/components/Forms/EssayForm';
import { TooltipProvider } from '@radix-ui/react-tooltip';

export default async function EditEssayPageasync({
  params,
}: {
  params: Promise<{ essayId: string }>;
}) {
  const { essayId } = await params;
  const user = await requireUser('/');

  // Proverava da li je korisnik autor sastava ili admin
  const canEdit = await canUserEditEssay(essayId);
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
            isLoggedIn={user ? true : false}
          />
        </TooltipProvider>
      </div>
    </ContentWrapper>
  );
}
