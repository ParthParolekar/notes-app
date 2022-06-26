export const initialState = {
  sortByDate: "latest",
  filterByTags: [],
  filterByPriority: "all",
};

export const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case "SORT_BY_DATE":
      return { ...state, sortByDate: payload };
    case "FILTER_BY_TAGS":
      return { ...state, filterByTags: payload };
    case "FILTER_BY_PRIORITY":
      return { ...state, filterByPriority: payload };
    default:
      return state;
  }
};
