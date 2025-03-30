async function paginateResults(model, page, limit) {
  const start = (page - 1) * limit;
  const totalItems = await model.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);

  const results = await model.find().skip(start).limit(limit);

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
