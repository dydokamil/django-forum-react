import { FETCH_THREADS } from "../actions/";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_THREADS:
      return _.orderBy(action.payload.data, ["last_activity"], ["desc"]);
    default:
      return state;
  }
}
