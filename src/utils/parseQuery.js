const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 25;

const getQuery = (query, key) => {
  if (!query[key]) return;

  return query[key].split(',').join(' ');
};

const parseQueryOperators = (query) => {
  const regex = /\b(gt|gte|lt|lte|in|regex|options|limit)\b/g;
  const queryStr = JSON.stringify({ ...query }).replace(
    regex,
    (match) => `$${match}`
  );

  return JSON.parse(queryStr);
};

const removeQueryFields = (query, fields = []) => {
  const reqQuery = { ...query };
  fields.forEach((key) => delete reqQuery[key]);

  return reqQuery;
};

export const parseQuery = (query) => {
  const selectQuery = getQuery(query, 'select');
  const sortQuery = getQuery(query, 'sort');
  const limit = Number(getQuery(query, 'limit')) || DEFAULT_PAGE_LIMIT;
  const page = Number(getQuery(query, 'page')) || DEFAULT_PAGE;
  const mainQuery = parseQueryOperators(
    removeQueryFields(query, ['select', 'sort', 'limit', 'page'])
  );

  return { mainQuery, selectQuery, sortQuery, limit, page };
};
