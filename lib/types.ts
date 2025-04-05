import { Prisma } from '@prisma/client';

export type EssayWithAuthorCategoryAvg = Prisma.EssayGetPayload<{
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
    ratings: {
      select: {
        value: true;
      };
    };
  };
}> & {
  averageRating: number | null;
};
