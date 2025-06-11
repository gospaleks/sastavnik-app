import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { formatDate } from '@/lib/utils';
import { getEssayById } from '@/data/essay/getEssayById';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import StarRating from './StarRating';
import EssaysByAuthor from './EssaysByAuthor';
import EssaysWithSameCategory from './EssaysWithSameCategory';
import { FavoriteToggleButton } from './FavoriteToggleButton';

import CommentForm from '@/components/Forms/CommentForm';
import EssaysByAuthorSkeleton from '@/components/Loaders/EssaysByAuthorSkeleton';
import EssayDropdown from '@/components/EssayDropdown';
import ContentWrapper from '@/components/ContentWrapper';
import AlertCard from '@/components/AlertCard';
import InfoBox from '@/components/InfoBox';

import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  BookOpenIcon,
  Calendar,
  MessageCircleMoreIcon,
  MessageSquareIcon,
  School,
  Tag,
  UserIcon,
} from 'lucide-react';

import '@/components/minimal-tiptap/styles/index.css';
import { CommentWithAuthor } from '@/lib/types';
import CommentsList from '@/components/Comments/CommentsList';
import { getUsersRatingForEssay } from '@/data/user/getUsersRatingForEssay';
import { isEssayFavoriteForUser } from '@/data/user/isEssayFavoriteForUser';
import UserAvatar from '@/components/Layout/Header/UserAvatar';
import { Separator } from '@/components/ui/separator';

type PageProps = {
  params: Promise<{ essayId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { essayId } = await params;
  const essay = await getEssayById(essayId);

  if (!essay) {
    return {
      title: 'Sastav nije pronađen',
      description: 'Ovaj sastav ne postoji ili je obrisan.',
    };
  }

  const baseUrl = process.env.BASE_URL || '';

  return {
    title: `${essay.title}`,
    description: essay.content.replace(/<[^>]+>/g, '').slice(0, 80) + '...',
    authors: [
      {
        name: `${essay.author.firstName} ${essay.author.lastName}`,
        url:
          essay.author.email !== 'anonimni korisnik'
            ? `${baseUrl}/profil/${essay.authorId}`
            : undefined,
      },
    ],
    keywords: [
      essay.category.name,
      essay.schoolType,
      `${essay.level}. razred`,
      ...essay.tags,
    ],
  };
}

const EssayPage = async ({ params }: PageProps) => {
  const { essayId } = await params;
  const essay = await getEssayById(essayId);

  if (!essay) return notFound();

  const { getUser, getPermission } = getKindeServerSession();
  const [user, adminPermission] = await Promise.all([
    getUser(),
    getPermission('admin:access'),
  ]);
  const isAdmin = adminPermission?.isGranted;

  if (!essay.published && !isAdmin) return notFound();

  const canEdit = user && (user.id === essay.authorId || isAdmin);

  // Pribavi rating i favorite paralelno
  const [usersRating, isFavorite] = user
    ? await Promise.all([
        getUsersRatingForEssay(user.id, essayId),
        isEssayFavoriteForUser(essayId, user.id),
      ])
    : [null, false];

  const formattedDate = formatDate(essay.createdAt);

  // Grupisi komentare
  const commentsByParentId = {} as Record<string, CommentWithAuthor[]>;
  essay.comments.forEach((comment) => {
    if (!commentsByParentId[comment.parentId || '']) {
      commentsByParentId[comment.parentId || ''] = [];
    }
    commentsByParentId[comment.parentId || ''].push(comment);
  });

  // Komentari koji su na vrhu (bez roditelja)
  const topLevelComments = commentsByParentId[''] || [];

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-8 md:flex-row">
        {/** Leva strana: Sastav */}
        <div className="w-full space-y-2 md:w-8/12">
          {!essay.published && (
            <AlertCard
              title="Neobjavljeni sastav"
              description="Ovaj sastav nije objavljen i može ga videti samo admin."
            />
          )}

          {/** Naslov sastava */}
          <div className="relative">
            <h1
              className={`${canEdit && essay ? 'mr-8' : ''} text-center text-3xl font-extrabold tracking-tight md:text-left md:text-4xl`}
            >
              {essay.title}
            </h1>

            {canEdit && essay && (
              <div className="absolute top-0 right-0">
                <EssayDropdown essay={essay} isAdmin={isAdmin} />
              </div>
            )}
          </div>

          {/** Autor i datum */}
          <div className="my-4 flex w-full flex-col items-center gap-2 md:flex-row md:items-start">
            {essay.author.email === 'anonimni korisnik' ? (
              <span className="text-muted-foreground flex items-center gap-1 font-medium">
                <span className="font-semibold">
                  {essay.author.firstName} {essay.author.lastName}
                </span>
              </span>
            ) : (
              <Link
                href={`/profil/${essay.authorId}`}
                className="hover:text-primary flex items-center gap-1 font-medium transition-colors"
              >
                <span className="flex items-center gap-2 font-semibold">
                  {essay.author.firstName} {essay.author.lastName}
                </span>
              </Link>
            )}

            <span className="text-muted-foreground hidden md:inline">•</span>

            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
          </div>

          {/** Kategorija, tip skole, razred */}
          <div className="my-2 flex flex-wrap gap-2 md:justify-start">
            <Link
              href={`/kategorije/${essay.category.name}`}
              className="bg-muted text-muted-foreground flex w-full items-center justify-between gap-1 rounded-md px-3 py-2 text-sm hover:shadow-sm md:w-fit"
            >
              <div className="flex items-center gap-2">
                <BookOpenIcon className="h-4 w-4" />
                <span>{essay.category.name}</span>
              </div>
              <ArrowRight size={15} className="md:hidden" />
            </Link>

            <Link
              href={`/sastavi?schoolType=${essay.schoolType}&grade=${essay.level}`}
              className="bg-muted text-muted-foreground flex w-full items-center justify-between gap-1 rounded-md px-3 py-2 text-sm hover:shadow-sm md:w-fit"
            >
              <div className="flex items-center gap-2">
                <School className="h-4 w-4" />
                <span>
                  {essay.schoolType === 'OSNOVNA'
                    ? 'Osnovna škola'
                    : 'Srednja škola'}
                </span>
                <span>{essay.level}. razred</span>
              </div>
              <ArrowRight size={15} className="md:hidden" />
            </Link>
          </div>

          <div className="flex w-full flex-col items-center gap-2 md:flex-row">
            <StarRating
              isLoggedIn={!!user}
              essayId={essay.id}
              usersRating={usersRating?.value}
              averageInit={essay.averageRating}
              ratingCountInit={essay.ratingCount}
            />

            {/** Dugme za Favorite */}
            <FavoriteToggleButton
              essayId={essay.id}
              initiallyFavorite={isFavorite}
            />
          </div>

          {/* <Separator className="my-4" /> */}

          {/** Prikazivanje sadržaja sastava */}
          <div
            className="minimal-tiptap-content mt-4"
            dangerouslySetInnerHTML={{ __html: essay.content }}
          />

          {/** Prikazivanje tagova */}
          {essay.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Tag className="text-muted-foreground h-4 w-4" />
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

          <Separator className="mt-8" />

          {/** Comment sekcija */}
          <div className="my-8 space-y-4">
            <h1 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <MessageSquareIcon className="h-5 w-5" /> Komentari (
              {essay.comments.length}):
            </h1>

            {user && <CommentForm essayId={essay.id} />}

            {essay.comments.length > 0 ? (
              <CommentsList
                userId={user?.id}
                isAdmin={isAdmin}
                essayId={essay.id}
                comments={topLevelComments}
                commentsByParentId={commentsByParentId}
              />
            ) : (
              <InfoBox message="Nema komentara za ovaj sastav." />
            )}

            {!user && (
              <div className="w-full">
                <AlertCard
                  title="Nisi prijavljen/a"
                  description="Da bi mogao/la da komentarišeš, moraš biti prijavljen/a."
                />
              </div>
            )}
          </div>
        </div>

        {/** Desna strana: Sastavi istog autora i sastavi iste kategorije */}
        <div className="flex w-full flex-col gap-8 md:w-4/12">
          {essay.author.email !== 'anonimni korisnik' && (
            <div>
              <p className="text-xl font-semibold">🖋️ Ostali sastavi autora:</p>
              <Suspense fallback={<EssaysByAuthorSkeleton />}>
                <EssaysByAuthor
                  authorId={essay.author.id}
                  essayToSkipId={essayId}
                />
              </Suspense>
            </div>
          )}

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
