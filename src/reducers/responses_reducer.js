import { FETCH_RESPONSES } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RESPONSES:
      return action.payload.data;
    default:
      return state;
  }
}
