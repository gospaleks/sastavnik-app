import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const filterSearchParams = {
  page: parseAsInteger.withDefault(1),
  searchTerm: parseAsString.withDefault(''),
  schoolType: parseAsString.withDefault(''),
  grade: parseAsString.withDefault(''),
  sort: parseAsString.withDefault('desc'),
};

export const loadSearchParams = createLoader(filterSearchParams);
