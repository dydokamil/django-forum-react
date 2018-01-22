import axios from "axios";

export const FETCH_FORUMS = "fetch_forums";

const ROOT_URL = "http://localhost:8000/forumapp";

export function fetchForums() {
  const request = axios.get(`${ROOT_URL}/rest/forums/`);

  return {
    type: FETCH_FORUMS,
    payload: request
  };
}
