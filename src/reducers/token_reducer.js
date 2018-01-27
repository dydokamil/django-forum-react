import { SET_TOKEN } from "../actions";
import { UNSET_TOKEN } from "../actions";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  authentitated: token !== undefined,
  token: token
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOKEN:
      if (!action.payload.data) {
        // if no token was returned
        return { ...state, errors: "Invalid credentials." };
      } else {
        // if token was returned
        return {
          ...state,
          token: action.payload.data.token,
          authentitated: true
        };
      }
    case UNSET_TOKEN:
      // if logout was called
      return { ...state, authentitated: false };
    default:
      return state;
  }
}
