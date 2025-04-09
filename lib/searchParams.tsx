import { createLoader, parseAsInteger } from 'nuqs/server';

export const filterSearchParams = {
  offset: parseAsInteger.withDefault(1),
};

export const loadSearchParams = createLoader(filterSearchParams);
