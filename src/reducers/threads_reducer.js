import { FETCH_THREADS } from "../actions/";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_THREADS:
      return action.payload.data;
    default:
      return state;
  }
}
