import sendRequest from "./sendRequest";

const BASE_URL = "/api/games";

export function rawGIdx() {
  return sendRequest(`${BASE_URL}/rawGIdx`, 'GET');
}

export function search(query) {
console.log(query);
  return sendRequest(`${BASE_URL}/search/?search=${query}`, 'GET');
}