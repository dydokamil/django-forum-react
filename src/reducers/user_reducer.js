import { FETCH_USER } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      if (action.error) {
        // hadle the error
        console.log(action.payload);
      }
      return { ...state, [action.payload.data.id]: action.payload.data };

    default:
      return state;
  }
}
