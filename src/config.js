const BEDREFORSLAG_URL = 'https://bedreforslag.herokuapp.com';

const INT_32_MAX = 2147483647;

export const FORSLAG_URL = `https://www.borgerforslag.dk/api/proposals/search`;

export const FORSLAG_OPTIONS = {
  pageNumber: 0,
  pageSize: INT_32_MAX,
  searchQuery: '',
  sortOrder: 'MostVotesFirst',
};

export const UPDATE_URL = `${BEDREFORSLAG_URL}/api/v1/update`;
