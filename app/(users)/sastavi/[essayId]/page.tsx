import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { getEssayById } from '@/lib/services/essayService';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import StarRating from '@/components/StarRating';
import EssaysByAuthor from './EssaysByAuthor';
import ContentWrapper from '@/components/ContentWrapper';
import AlertCard from '@/components/AlertCard';
import EssaysByAuthorSkeleton from '@/components/Loaders/EssaysByAuthorSkeleton';
import { Badge } from '@/components/ui/badge';
import EssaysWithSameCategory from './EssaysWithSameCategory';
import { ExternalLinkIcon } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ essayId: string }>;
}) {
  const { essayId } = await params;
  const essay = await getEssayById(essayId);

  return {
    title: `${essay.title}`,
  };
}

export const EssayPage = async ({
  params,
}: {
  params: Promise<{ essayId: string }>;
}) => {
  const { essayId } = await params;
  const essay = await getEssayById(essayId);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const usersRating = user
    ? await prisma.rating.findFirst({
        where: {
          userId: user.id,
          essayId: essay.id,
        },
        select: {
          value: true,
        },
      })
    : null;

  const formattedDate = formatDate(essay.createdAt);

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-8 md:flex-row">
        {/** Leva strana: Sastav */}
        <div className="w-full space-y-2 md:w-8/12">
          <h1 className="text-primary text-center text-3xl font-extrabold tracking-tight md:text-left md:text-4xl">
            {essay.title}
          </h1>

          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground flex items-center gap-2 text-center text-sm md:text-left md:text-base">
              <span className="font-bold">Autor: </span>
              <Link
                href={`/profil/${essay.authorId}`}
                className="text-primary hover:text-primary/80 flex items-center gap-1 font-semibold underline underline-offset-4 transition-colors"
              >
                {essay.author.firstName} {essay.author.lastName}
                <ExternalLinkIcon
                  className="inline-block animate-pulse"
                  size={17}
                />
              </Link>
            </p>

            <p className="text-muted-foreground text-center text-xs italic md:text-left">
              Objavljeno: {formattedDate}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-start">
            <div className="bg-muted text-muted-foreground w-full rounded-md px-3 py-2 text-sm md:w-fit">
              <span className="text-primary font-semibold">Kategorija:</span>{' '}
              {essay.category.name}
            </div>

            <div className="bg-muted text-muted-foreground w-full rounded-md px-3 py-2 text-sm md:w-fit">
              <span className="text-primary font-semibold">
                {essay.schoolType === 'OSNOVNA'
                  ? 'Osnovna škola'
                  : 'Srednja škola'}
              </span>
              , {essay.level}. razred
            </div>
          </div>

          <StarRating
            isLoggedIn={!!user}
            essayId={essay.id}
            usersRating={usersRating?.value}
            averageInit={essay.averageRating}
            ratingCountInit={essay.ratingCount}
          />

          <div className="prose prose-invert dark:prose-invert lg:prose-lg mx-auto mt-8 max-w-none whitespace-pre-wrap">
            {essay.content}
          </div>

          {essay.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {essay.tags.map((tag, index) => (
                <Link href={`/tag/${tag}`} key={index}>
                  <Badge
                    variant="outline"
                    className="hover:bg-accent cursor-pointer transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          <AlertCard
            title="NAPOMENA:"
            description="Sastavi nisu namenjeni prepisivanju. Ovi tekstovi su primeri i služe učenju i shvatanju kako sastav ili pismeni rad treba biti napisan."
            variant="destructive"
            className="mt-4"
          />
        </div>

        {/** Desna strana: Sastavi istog autora i sastavi iste kategorije */}
        <div className="flex w-full flex-col gap-8 md:w-4/12">
          <div>
            <p className="text-xl font-semibold">🖋️ Ostali sastavi autora:</p>
            <Suspense fallback={<EssaysByAuthorSkeleton />}>
              <EssaysByAuthor
                authorId={essay.author.id}
                essayToSkipId={essayId}
              />
            </Suspense>
          </div>

          <div>
            <p className="text-xl font-semibold">
              📚 Sastavi iz iste kategorije:
            </p>
            <Suspense fallback={<EssaysByAuthorSkeleton />}>
              <EssaysWithSameCategory
                categoryName={essay.category.name}
                essayToSkipId={essayId}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default EssayPage;
