import axios from "axios";

export const FETCH_FORUMS = "fetch_forums";
export const FETCH_SECTIONS = "fetch_sections";
export const FETCH_THREADS = "fetch_threads";
export const FETCH_THREAD = "fetch_thread";
export const FETCH_RESPONSES = "fetch_responses";
export const SET_TOKEN = "set_token";

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

export function fetchThreads(id) {
  const request = axios.get(`${ROOT_URL}/rest/forum_threads/${id}/`);

  return {
    type: FETCH_THREADS,
    payload: request
  };
}

export function fetchThread(id) {
  const request = axios.get(`${ROOT_URL}/rest/threads/${id}/`);

  return {
    type: FETCH_THREAD,
    payload: request
  };
}

export function fetchResponses(id) {
  const request = axios.get(`${ROOT_URL}/rest/thread_responses/${id}`);

  return {
    type: FETCH_RESPONSES,
    payload: request
  };
}

export function fetchToken(values) {
  const request = axios.post(`${ROOT_URL}/api-token-auth/`, values);

  return {
    type: SET_TOKEN,
    payload: request
  };
}
