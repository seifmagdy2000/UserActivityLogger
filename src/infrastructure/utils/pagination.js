async function paginateResults(model, page, limit, filter = {}) {
  const start = (page - 1) * limit;
  const totalItems = await model.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);

  const results = await model.find(filter).skip(start).limit(limit);

  return {
    success: true,
    totalItems,
    totalPages,
    currentPage: page,
    limit,
    results,
  };
}

export default paginateResults;
