import { SET_TOKEN } from "../actions";
import { UNSET_TOKEN } from "../actions";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const INITIAL_STATE = {
  error: null,
  content: "",
  authenticated: cookies.get("token") !== undefined,
  token: cookies.get("token")
};

export default function(state = INITIAL_STATE, action) {
  if (action.error) {
    cookies.remove("token");
    return {
      ...state,
      authenticated: false,
      error: action.payload.response.data,
      token: null
    };
  }
  switch (action.type) {
    case SET_TOKEN:
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
    default:
      return state;
  }
}
