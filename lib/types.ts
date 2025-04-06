import { Prisma } from '@prisma/client';

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

export type EssayWithAuthorCategoryRating = EssayWithAuthorCategory & {
  averageRating: number | null;
  ratingCount: number | null;
};
