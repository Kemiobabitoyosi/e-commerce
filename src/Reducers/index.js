import cart from "./cart";
import currency from "./currency";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cart,
  currency,
});

export default rootReducer;
