import { UNSET_TOKEN, GET_TOKEN, SET_TOKEN } from "../actions";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const INITIAL_STATE = {
  error: null,
  authenticated: cookies.get("token") !== undefined,
  token: cookies.get("token")
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOKEN:
      if (action.error) {
        return { ...state, error: action.payload.response.data };
      }
      // if token was returned
      cookies.set("token", action.payload.data.token, { path: "/" });
      return {
        ...state,
        token: action.payload.data.token,
        authenticated: true,
        error: null
      };

    case UNSET_TOKEN:
      // if logout was called
      cookies.remove("token");
      return { ...state, token: null, authenticated: false, error: null };
    case GET_TOKEN:
    default:
      return state;
  }
}
