import { FETCH_FORUMS } from "../actions/";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_FORUMS:
      return action.payload.data;
    default:
      return state;
  }
}
