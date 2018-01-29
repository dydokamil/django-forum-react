import { CREATE_THREAD } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_THREAD:
      if (action.error) {
        console.log("everybody panic");
        return { error: action.payload.response.data };
      }
      return action.payload.data;

    default:
      return state;
  }
}
