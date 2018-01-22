import { combineReducers } from "redux";
import forumsReducer from "./forums_reducer";
import sectionsReducer from "./sections_reducer";

const rootReducer = combineReducers({
  forums: forumsReducer,
  sections: sectionsReducer
});

export default rootReducer;
