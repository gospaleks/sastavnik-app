import { Essay, Prisma } from '@prisma/client';

// Essay types
export type EssayWithCategory = Prisma.EssayGetPayload<{
  include: {
    category: true;
  };
}>;

export type EssayWithAuthorCategory = Prisma.EssayGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        firstName: true;
        lastName: true;
        email: true;
      };
    };
    category: true;
    _count: {
      select: {
        comments: true;
      };
    };
  };
}>;

export type EssayById = EssayWithAuthorCategory & {
  comments: CommentWithAuthor[];
};

export type CommentWithAuthor = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
  } | null;
  parentId: string | null;
  parent: {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    essayId: string | null;
    authorId: string | null;
    parentId: string | null;
  } | null;
};

export type EssayWithComments = {
  id: string;
  title: string;
  comments: CommentWithAuthor[];
};

export type EssayWithAuthorCategoryFavorite = EssayWithAuthorCategory & {
  isFavorite: boolean;
};

// User types
export type UserWithEssays = Prisma.UserGetPayload<{
  include: {
    essays: {
      include: {
        category: true;
      };
    };
    favoriteEssays: {
      include: {
        category: true;
      };
    };
  };
}>;

export type UserWithNumberOfEssays = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        essays: true;
      };
    };
  };
}>;
