import { combineReducers } from "redux";
import forumsReducer from "./forums_reducer";
import sectionsReducer from "./sections_reducer";
import threadsReducer from "./threads_reducer";
import threadReducer from "./thread_reducer";
import responsesReducer from "./responses_reducer";

const rootReducer = combineReducers({
  forums: forumsReducer,
  sections: sectionsReducer,
  threads: threadsReducer,
  thread: threadReducer,
  responses: responsesReducer
});

export default rootReducer;
