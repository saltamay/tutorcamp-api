const getQuery = (query, key) => {
  if (!query[key]) return;

  return query[key].split(',').join(' ');
};

const parseQueryOperators = (query) => {
  const regex = /\b(gt|gte|lt|lte|in|regex|options)\b/g;
  const queryStr = JSON.stringify({ ...query }).replace(
    regex,
    (match) => `$${match}`
  );

  return JSON.parse(queryStr);
};

const removeQueryFields = (query, fields = []) => {
  const reqQuery = { ...query };
  return fields.forEach((key) => delete reqQuery[key]);
};

export const parseQuery = (query) => {
  const selectQuery = getQuery(query, 'select');
  const sortQuery = getQuery(query, 'sort');
  const mainQuery = parseQueryOperators(
    removeQueryFields(query, ['select', 'sort'])
  );

  return { mainQuery, selectQuery, sortQuery };
};
