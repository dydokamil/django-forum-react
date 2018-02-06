import { ADD_EDITED_THREAD, REMOVE_EDITED_THREAD } from "../actions";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_EDITED_THREAD:
      return [...state, action.id];

    case REMOVE_EDITED_THREAD:
      return state.filter(s => s != action.id);

    default:
      return state;
  }
}
