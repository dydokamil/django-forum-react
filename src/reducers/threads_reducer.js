import { FETCH_THREADS, FETCH_THREADS_USER } from "../actions/";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_THREADS:
      return _.mapKeys(
        _.orderBy(action.payload.data, ["last_activity"], ["desc"]),
        "id"
      );

    case FETCH_THREADS_USER:
      return _.merge(
        {},
        state,
        _.mapKeys(
          _.orderBy(action.payload.data, ["last_activity"], ["desc"]),
          "id"
        )
      );

    default:
      return state;
  }
}
