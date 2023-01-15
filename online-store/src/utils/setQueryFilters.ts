export const setQueryFilters = (...filtersQuerys: string[]) => {
  if (
    window.location.pathname === "/" &&
    filtersQuerys.some((filterQuery) => filterQuery !== "")
  ) {
    const filtersQueryString = filtersQuerys
      .filter((filterQuery) => filterQuery !== "")
      .join("");
    window.history.replaceState(
      null,
      "Online store",
      `/${filtersQueryString}`.replace("&", "?")
    );
  }
};
