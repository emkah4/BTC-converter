import { combineReducers } from "redux";

import eurAddedReducer from "./isEurAdded";
import usdAddedReducer from "./isUsdAdded";
import gbpAddedReducer from "./isGbpAdded";

const allReducers = combineReducers({
    EUR: eurAddedReducer,
    USD: usdAddedReducer,
    GBP: gbpAddedReducer
})

export default allReducers;