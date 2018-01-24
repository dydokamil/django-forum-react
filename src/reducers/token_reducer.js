import { SET_TOKEN } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN:
      if (!action.payload.data) {
        return { errors: ["Invalid credentials."] };
      }
      return { token: action.payload.data.token };
    default:
      return state;
  }
}
