import { FETCH_THREAD } from "../actions/";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_THREAD:
      return action.payload.data;
    default:
      return state;
  }
}
