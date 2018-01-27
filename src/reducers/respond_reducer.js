import { RESPOND } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case RESPOND:
      if (action.error) {
        return { errors: action.payload.response.data };
      }
      return { msg: "Created response" };
    default:
      return state;
  }
}
