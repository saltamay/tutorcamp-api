import { createPagination, parseQuery } from '../utils/index.js';

export const filterHandler =
  (resource, populate = '') =>
  async (req, res, next) => {
    const { mainQuery, selectQuery, sortQuery, limit, page } = parseQuery(
      req.query
    );

    const results = await resource
      .find(mainQuery)
      .populate(populate)
      .limit(limit)
      .skip((page - 1) * limit)
      .select(selectQuery)
      .sort(sortQuery);

    const pagination = await createPagination({
      count: results.length,
      page,
      limit,
    });

    res.results = {
      success: true,
      pagination,
      data: results,
    };

    next();
  };
