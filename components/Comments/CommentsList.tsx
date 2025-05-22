import { CommentWithAuthor } from '@/lib/types';
import CommentCard from './CommentCard';

type Props = {
  userId?: string;
  isAdmin?: boolean;
  essayId: string;
  comments: CommentWithAuthor[];
  commentsByParentId: Record<string, CommentWithAuthor[]>;
};

const CommentsList = ({
  userId,
  isAdmin,
  essayId,
  comments,
  commentsByParentId,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          userId={userId}
          isAdmin={isAdmin}
          essayId={essayId}
          comment={comment}
          commentsByParentId={commentsByParentId}
        />
      ))}
    </div>
  );
};

export default CommentsList;
