import { SIGN_UP } from "../actions";

export default function(state = {}, action) {
  if (action.error) {
    return { errors: action.payload.response.data };
  }
  switch (action.type) {
    case SIGN_UP:
      return action.payload.data;
    default:
      return state;
  }
}
