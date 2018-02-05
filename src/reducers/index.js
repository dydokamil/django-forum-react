import { combineReducers } from "redux";
import forumsReducer from "./forums_reducer";
import sectionsReducer from "./sections_reducer";
import threadsReducer from "./threads_reducer";
import threadReducer from "./thread_reducer";
import responsesReducer from "./responses_reducer";
import tokenReducer from "./token_reducer";
import signupReducer from "./signup_reducer";
import responseReducer from "./respond_reducer";
import userReducer from "./user_reducer";
import createThreadReducer from "./create_thread_reducer";
import recentTopicsReducer from "./recent_topics_reducer";
import editedResponsesReducer from "./edited_responses_reducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  forums: forumsReducer,
  sections: sectionsReducer,
  threads: threadsReducer,
  thread: threadReducer,
  responses: responsesReducer,
  form: formReducer,
  token_details: tokenReducer,
  sign_up: signupReducer,
  response_result: responseReducer,
  users: userReducer,
  create_thread_details: createThreadReducer,
  recent_topics: recentTopicsReducer,
  edited_responses: editedResponsesReducer
});

export default rootReducer;
