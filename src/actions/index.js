import axios from "axios";

export const FETCH_FORUMS = "fetch_forums";
export const FETCH_SECTIONS = "fetch_sections";

const ROOT_URL = "http://localhost:8000/forumapp";

export function fetchForums() {
  const request = axios.get(`${ROOT_URL}/rest/forums/`);

  return {
    type: FETCH_FORUMS,
    payload: request
  };
}

export function fetchSections() {
  const request = axios.get(`${ROOT_URL}/rest/sections/`);

  return {
    type: FETCH_SECTIONS,
    payload: request
  };
}
