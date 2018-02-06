import { FETCH_THREAD, CHANGE_MESSAGE_THREAD } from "../actions/";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_THREAD:
      return action.payload.data;
    case CHANGE_MESSAGE_THREAD:
      return { ...state, message: action.message };

    default:
      return state;
  }
}
