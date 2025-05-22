'use client';

import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, Reply } from 'lucide-react';
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
      <Card className="gap-4 py-4 shadow-none">
        <CardHeader className="text-muted-foreground text-xs">
          <CardTitle className="flex items-center gap-2">
            <Link
              href={`/profil/${comment.author?.id}`}
              className="group flex cursor-pointer items-center gap-2"
            >
              <Avatar className="rounded-full border">
                <AvatarImage
                  src={comment.author?.image || '/default_avatar.png'}
                  alt="avatar"
                />
                <AvatarFallback>
                  {comment.author?.firstName?.[0]}
                  {comment.author?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1 font-normal">
                <span className="">{formattedDate}</span>
                <span className="underline-offset-4 group-hover:underline">
                  {comment.author?.firstName} {comment.author?.lastName}
                </span>
              </div>
            </Link>

            {(isAdmin || (userId && userId === comment.author?.id)) && (
              <div className="ml-auto">
                <CommentDropdown essayId={essayId} comment={comment} />
              </div>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>{comment.content}</CardContent>

        <CardFooter className="flex items-start justify-between gap-2">
          {/* Show/Hide replies button */}
          {childComments.length > 0 && (
            <Button
              variant="link"
              className="text-muted-foreground text-xs"
              size={'sm'}
              onMouseEnter={() => setIsRepliesHovered(true)}
              onMouseLeave={() => setIsRepliesHovered(false)}
              onClick={toggleReplies}
              type="button"
            >
              {isRepliesVisible
                ? 'Sakrij odgovore'
                : `Prikaži odgovore (${childComments.length})`}

              {isRepliesVisible && <ChevronDown size={15} />}
            </Button>
          )}

          {userId && (
            <Button
              variant={'outline'}
              onClick={toggleReplyForm}
              size="sm"
              className="ml-auto"
            >
              <Reply />
              Odgovori
              {isReplyFormOpen && <ChevronDown />}
            </Button>
          )}
        </CardFooter>
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
              <div className="mb-2 ml-4">
                <CommentForm
                  essayId={essayId}
                  parentId={comment.id}
                  autoFocus={true}
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
