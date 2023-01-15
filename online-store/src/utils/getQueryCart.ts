export const getQueryCart = (
  limitOfProductsPerPage: number,
  pageOfProductsCart: number
) => {
  const limitOfProductsPerPageQuery =
    limitOfProductsPerPage && `&limit=${limitOfProductsPerPage}`;
  const pageOfProductsCartQuery =
    pageOfProductsCart && `&page=${pageOfProductsCart}`;

  if (limitOfProductsPerPage || pageOfProductsCart) {
    window.history.replaceState(
      null,
      "Online store",
      `/cart${limitOfProductsPerPageQuery}${pageOfProductsCartQuery}`.replace(
        "&",
        "?"
      )
    );
  }
};
