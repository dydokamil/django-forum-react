import { SIGN_UP } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case SIGN_UP:
      if (action.error) {
        return { errors: action.payload.response.data };
      }
      return action.payload.data;
    default:
      return state;
  }
}
