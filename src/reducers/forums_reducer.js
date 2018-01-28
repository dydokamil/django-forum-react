import { FETCH_FORUMS, FETCH_FORUM } from "../actions/";
import _ from "lodash";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_FORUM:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_FORUMS:
      return _.mapKeys(action.payload.data, "id");
    default:
      return state;
  }
}
