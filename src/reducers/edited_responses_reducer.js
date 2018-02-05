import { ADD_EDITED_RESPONSE, REMOVE_EDITED_RESPONSE } from "../actions";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_EDITED_RESPONSE:
      return [...state, action.id];

    case REMOVE_EDITED_RESPONSE:
      return state.filter(s => s != action.id);

    default:
      return state;
  }
}
