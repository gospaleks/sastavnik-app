import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const filterSearchParams = {
  page: parseAsInteger.withDefault(1),
  searchTerm: parseAsString.withDefault(''),
  schoolType: parseAsString.withDefault(''),
  grade: parseAsString.withDefault(''),
};

export const loadSearchParams = createLoader(filterSearchParams);
