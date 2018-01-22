import { combineReducers } from "redux";
import forumsReducer from "./forums_reducer";

const rootReducer = combineReducers({
  forums: forumsReducer
});

export default rootReducer;
