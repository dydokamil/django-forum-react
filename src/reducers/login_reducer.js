import { LOGIN } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      console.log("TOKEN", action.payload.data.token);
      return action.payload.data;
    default:
      return state;
  }
}
