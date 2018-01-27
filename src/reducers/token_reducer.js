import { SET_TOKEN } from "../actions";
import { UNSET_TOKEN } from "../actions";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const INITIAL_STATE = {
  error: "",
  content: "",
  authentitated: token !== undefined,
  token: token
};

export default function(state = INITIAL_STATE, action) {
  if (action.error) {
    return { ...state, error: action.payload.response.data };
  }
  switch (action.type) {
    case SET_TOKEN:
      // if token was returned
      return {
        ...state,
        token: action.payload.data.token,
        authentitated: true,
        error: null
      };

    case UNSET_TOKEN:
      // if logout was called
      return { ...state, token: null, authentitated: false, error: null };
    default:
      return state;
  }
}
