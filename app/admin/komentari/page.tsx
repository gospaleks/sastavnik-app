import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Metadata } from 'next/types';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { CommentWithAuthor } from '@/lib/types';

import { isAdmin } from '../isAdmin';
import { getAllComments } from '@/lib/services/commentService';

import ContentWrapper from '@/components/ContentWrapper';
import CommentsList from '@/components/Comments/CommentsList';
import InfoBox from '@/components/InfoBox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Komentari',
};

const CommentsPage = async () => {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) redirect('/');

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const essaysWithComments = await getAllComments();

  return (
    <ContentWrapper>
      <h1 className="mb-4 text-center text-3xl font-extrabold tracking-tight">
        Komentari po sastavima
      </h1>

      {essaysWithComments.length > 0 ? (
        <Accordion type="single" className="my-4 w-full">
          {essaysWithComments.map((essay) => {
            // Grupisi komentare
            const commentsByParentId: Record<string, CommentWithAuthor[]> = {};
            essay.comments.forEach((comment) => {
              const parentKey = comment.parentId || '';
              if (!commentsByParentId[parentKey]) {
                commentsByParentId[parentKey] = [];
              }
              commentsByParentId[parentKey].push(comment);
            });

            // Komentari koji su na vrhu (bez roditelja)
            const topLevelComments = commentsByParentId[''] || [];

            return (
              <AccordionItem
                key={essay.id}
                value={essay.id}
                className="border border-b-0 px-4 first:rounded-t-md last:rounded-b-md last:border-b"
              >
                <AccordionTrigger className="underline-offset-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold tracking-tight md:text-xl">
                        {essay.title}
                      </h1>
                      <Link
                        href={`/sastavi/${essay.id}`}
                        className="hover:text-muted-foreground transition-colors"
                      >
                        <ExternalLink />
                      </Link>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Broj komentara: {essay.comments.length}
                    </p>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <CommentsList
                    comments={topLevelComments}
                    commentsByParentId={commentsByParentId}
                    essayId={essay.id}
                    isAdmin={isUserAdmin}
                    userId={user?.id}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <InfoBox message="Nema komentara." />
      )}
    </ContentWrapper>
  );
};

export default CommentsPage;
