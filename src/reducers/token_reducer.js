import { UNSET_TOKEN, GET_TOKEN, SET_TOKEN } from "../actions";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();
//
// function removeCookie() {
//   cookies.remove("token", { path: "/" });
// }

// function setUserInfo(id, username, token) {
//   cookies.set("username", username, { path: "/" });
//   cookies.set("user_id", id, { path: "/" });
//   cookies.set("token", token, { path: "/" });
// }

export default function(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN:
      if (action.error) {
        return { ...state, error: action.payload.response.data };
      }
      // if token was returned
      // cookies.set("token", action.payload.data.token, { path: "/" });
      return {
        ...state,
        token: action.payload.data.token,
        authenticated: true,
        error: null,
        user_id: action.payload.data.user_id,
        username: action.payload.data.username
      };

    case UNSET_TOKEN:
      // if logout was called
      // removeCookie();
      return { ...state, token: undefined, authenticated: false, error: null };
    case GET_TOKEN:
    default:
      return state;
  }
}
