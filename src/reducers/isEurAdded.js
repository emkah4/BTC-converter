const eurAddedReducer = (state = false, action) => {
  switch (action.type) {
    case 'EUR_FIELD_ADDED':
      return !state;
    case 'EUR_FIELD_REMOVED':
      return false;
    default:
      return state;
  }
};

export default eurAddedReducer;