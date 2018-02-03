import { FETCH_RESPONSES, CLEAR_RESPONSES } from "../actions";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RESPONSES:
      return _.mapKeys(action.payload.data, "id");
    // return action.payload.data;
    case CLEAR_RESPONSES:
      return {};
    default:
      return state;
  }
}
