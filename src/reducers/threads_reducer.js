import { FETCH_THREADS, FETCH_THREADS_USER, DELETE_THREAD } from "../actions/";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_THREAD:
      return _.omit(state, action.id);
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
