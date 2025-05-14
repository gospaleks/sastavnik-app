import { Essay, Prisma } from '@prisma/client';

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
  };
}>;

export type EssayWithAuthorCategoryFavorite = EssayWithAuthorCategory & {
  isFavorite: boolean;
};

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
