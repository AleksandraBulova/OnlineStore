export const getPropsToFilter = (filterState: { [key: string]: boolean }) => {
  return Object.entries(filterState).reduce(
    (acc: string[], curr) => (curr[1] ? [...acc, curr[0]] : [...acc]),
    []
  );
};
