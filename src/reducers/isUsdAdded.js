const usdAddedReducer = (state = false, action) => {
  switch (action.type) {
    case "USD_FIELD_ADDED":
      return !state;
    case "USD_FIELD_REMOVED":
      return false;
    default:
      return state;
  }
};

export default usdAddedReducer;
