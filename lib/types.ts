import { Prisma } from '@prisma/client';

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

export type UserWithEssays = Prisma.UserGetPayload<{
  include: {
    essays: {
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
