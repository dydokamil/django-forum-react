import { FETCH_USER } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      if (action.error) {
        return { errors: action.payload.response.data };
      }
      return { ...state, [action.payload.data.id]: action.payload.data };

    default:
      return state;
  }
}
