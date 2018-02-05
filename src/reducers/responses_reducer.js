import {
  FETCH_RESPONSES,
  CLEAR_RESPONSES,
  DELETE_RESPONSE,
  EDIT_RESPONSE,
  CHANGE_MESSAGE
} from "../actions";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RESPONSES:
      return _.mapKeys(action.payload.data, "id");
    case DELETE_RESPONSE:
      return _.omit(state, action.id);
    case EDIT_RESPONSE:
      return state;
    case CHANGE_MESSAGE:
      let response = state[action.id];

      response.message = action.message;
      let d = {};
      d[response.id] = response;

      console.log(_.assign(_.omit(action.id), response));
      return _.assign(_.omit(state, action.id), d);

    case CLEAR_RESPONSES:
      return {};
    default:
      return state;
  }
}
