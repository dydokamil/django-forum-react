import axios from "axios";

export const FETCH_FORUMS = "fetch_forums";
export const FETCH_FORUM = "fetch_forum";
export const FETCH_SECTIONS = "fetch_sections";
export const FETCH_THREADS = "fetch_threads";
export const FETCH_THREAD = "fetch_thread";
export const FETCH_RESPONSES = "fetch_responses";
export const SET_TOKEN = "set_token";
export const UNSET_TOKEN = "unset_token";
export const SIGN_UP = "sign_up";
export const GET_TOKEN = "get_token";
export const RESPOND = "respond_thread";
export const FETCH_USER = "fetch_user";

const ROOT_URL = "http://localhost:8000/forumapp";

export function fetchForums() {
  const request = axios.get(`${ROOT_URL}/rest/forums/`);

  return {
    type: FETCH_FORUMS,
    payload: request
  };
}

export function fetchForum(id) {
  const request = axios.get(`${ROOT_URL}/rest/forums/${id}`);

  return {
    type: FETCH_FORUM,
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
  const request = axios.post(`${ROOT_URL}/rest/api-token-auth/`, values);

  return {
    type: SET_TOKEN,
    payload: request
  };
}

export function getToken() {
  return {
    type: GET_TOKEN
  };
}

export function logout(token) {
  let config = {
    headers: { Authorization: "Token " + token }
  };
  const request = axios.post(`${ROOT_URL}/rest/logout/`, null, config);

  return {
    type: UNSET_TOKEN,
    payload: request
  };
}

export function signUp(values) {
  const request = axios.post(`${ROOT_URL}/rest/signup/`, values);

  return {
    type: SIGN_UP,
    payload: request
  };
}

export function respond(thread_id, message, token) {
  let config = {
    headers: { Authorization: "Token " + token }
  };

  const request = axios.post(
    `${ROOT_URL}/rest/threadresponses/`,
    {
      thread: thread_id,
      message: message
    },
    config
  );

  return {
    type: RESPOND,
    payload: request
  };
}

export function fetchUser(id) {
  const request = axios.get(`${ROOT_URL}/rest/users/${id}`);

  return {
    type: FETCH_USER,
    payload: request
  };
}
