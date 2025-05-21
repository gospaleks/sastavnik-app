'use client';

import Link from 'next/link';

import { CommentWithAuthor } from '@/lib/types';
import { formatDate } from '@/lib/utils';

import CommentForm from '@/components/Forms/CommentForm';
import CommentsList from './CommentsList';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Reply } from 'lucide-react';
import CommentDropdown from './CommentDropdown';

type Props = {
  userId?: string;
  isAdmin?: boolean;
  essayId: string;
  comment: CommentWithAuthor;
  commentsByParentId: Record<string, CommentWithAuthor[]>;
};

const CommentCard = ({
  userId,
  isAdmin,
  essayId,
  comment,
  commentsByParentId,
}: Props) => {
  const childComments = commentsByParentId[comment.id] || [];

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const [isRepliesHovered, setIsRepliesHovered] = useState(false);

  const toggleReplyForm = () => {
    setIsReplyFormOpen((prev) => !prev);
  };

  const toggleReplies = () => {
    setIsRepliesVisible((prev) => !prev);
  };

  const formattedDate = formatDate(comment.createdAt);

  return (
    <>
      <Card className="relative gap-2 py-2">
        <CardHeader className="text-muted-foreground text-xs">
          <CardTitle className="flex flex-col gap-1">
            <span className="">{formattedDate}</span>

            <Link
              href={`/profil/${comment.author?.id}`}
              className="flex items-center gap-1 underline underline-offset-4 transition-colors hover:opacity-80"
            >
              {comment.author?.firstName} {comment.author?.lastName}
              <ArrowRight className="inline-block" size={13} />
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent>{comment.content}</CardContent>

        <CardFooter className="flex flex-col items-start">
          {userId && (
            <Button variant={'link'} onClick={toggleReplyForm} size="sm">
              <Reply />
              Odgovori
              {isReplyFormOpen && <ChevronDown />}
            </Button>
          )}

          {/* Show/Hide replies button */}
          {childComments.length > 0 && (
            <button
              className="text-muted-foreground/80 hover:text-muted-foreground mt-2 text-xs transition-colors hover:underline"
              onMouseEnter={() => setIsRepliesHovered(true)}
              onMouseLeave={() => setIsRepliesHovered(false)}
              onClick={toggleReplies}
              type="button"
            >
              {isRepliesVisible
                ? 'Sakrij odgovore'
                : `Prikaži odgovore (${childComments.length})`}
            </button>
          )}
        </CardFooter>

        {(isAdmin || (userId && userId === comment.author?.id)) && (
          <div className="absolute top-2 right-2">
            <CommentDropdown essayId={essayId} comment={comment} />
          </div>
        )}
      </Card>

      {(isRepliesVisible || isReplyFormOpen) && (
        <div className="flex">
          <div
            className={`inline-block w-px ${isRepliesHovered ? 'bg-primary' : 'bg-border'} transition-colors`}
            onClick={toggleReplies}
            onMouseEnter={() => setIsRepliesHovered(true)}
            onMouseLeave={() => setIsRepliesHovered(false)}
          />

          <div className="flex w-full flex-col gap-2">
            {isReplyFormOpen && (
              <div className="ml-4">
                <CommentForm
                  essayId={essayId}
                  parentId={comment.id}
                  onSubmitHandle={() => {
                    setIsRepliesVisible(true);
                    setIsReplyFormOpen(false);
                  }}
                />
              </div>
            )}

            {childComments.length > 0 && isRepliesVisible && (
              <div className="ml-4 flex-1">
                <CommentsList
                  userId={userId}
                  isAdmin={isAdmin}
                  essayId={essayId}
                  comments={childComments}
                  commentsByParentId={commentsByParentId}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CommentCard;
