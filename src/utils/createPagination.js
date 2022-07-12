export const createPagination = async (resource, page, limit) => {
  const count = await resource.countDocuments();
  const startPage = (page - 1) * limit;
  const endPage = page * limit;

  const pagination = {
    count,
    limit,
    page,
  };

  if (startPage > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  if (endPage < count) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  return pagination;
};
