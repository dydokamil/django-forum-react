import { combineReducers } from "redux";
import forumsReducer from "./forums_reducer";
import sectionsReducer from "./sections_reducer";
import threadsReducer from "./threads_reducer";
import threadReducer from "./thread_reducer";
import responsesReducer from "./responses_reducer";
import tokenReducer from "./token_reducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  forums: forumsReducer,
  sections: sectionsReducer,
  threads: threadsReducer,
  thread: threadReducer,
  responses: responsesReducer,
  form: formReducer,
  token_details: tokenReducer
});

export default rootReducer;
