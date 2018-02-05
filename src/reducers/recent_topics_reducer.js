import { FETCH_RECENT_TOPICS } from "../actions";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RECENT_TOPICS:
      if (action.error) {
        // handle the error
        return action.payload;
      }
      return _.mapKeys(action.payload.data, "forum");
    default:
      return state;
  }
}
