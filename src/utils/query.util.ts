export const buildPaginationQuery = (
  query: any,
  page: number,
  limit: number
): string => {
  const newQuery = { ...query, page, limit };

  delete newQuery.page;
  delete newQuery.limit;

  for (const key in newQuery) {
    if (newQuery[key] instanceof Date) {
      newQuery[key] = newQuery[key].toISOString().split("T")[0];
    }
  }

  const queryString = Object.keys(newQuery)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(newQuery[key])}`
    )
    .concat([`page=${page}`, `limit=${limit}`])
    .join("&");

  return queryString;
};
