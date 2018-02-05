import { RESPOND, CLEAR_RESPONSE_RESULT } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case RESPOND:
      if (action.error) {
        if (action.payload.response.status === 403) {
          return { errors: "You cannot post while banned." };
        }
      }
      return { msg: "Created response" };
    case CLEAR_RESPONSE_RESULT:
      return {};
    default:
      return state;
  }
}
