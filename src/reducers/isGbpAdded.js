const gbpAddedReducer = (state = false, action) => {
  switch (action.type) {
    case "GBP_FIELD_ADDED":
      return !state;
    case "GBP_FIELD_REMOVED":
      return false;
    default:
      return state;
  }
};

export default gbpAddedReducer;
