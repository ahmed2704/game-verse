import sendRequest from "./sendRequest";

const BASE_URL = "/api/games";

export function rawGIdx() {
  return sendRequest(`${BASE_URL}/rawGIdx`, 'GET');
}

export function search(query) {
  return sendRequest(`${BASE_URL}/search/?search=${query}`, 'GET');
}

export function rawGShow(id) {
  return sendRequest(`${BASE_URL}/rawGShow/${id}`, 'GET');
}

export function createReview(gameId, reviewData) {
  return sendRequest(`${BASE_URL}/${gameId}/reviews`, 'POST', reviewData);
}

export function updateReview(gameId, reviewId, reviewData) {
  return sendRequest(`${BASE_URL}/${gameId}/reviews/${reviewId}`, 'PUT', reviewData);
}

export function deleteReview(gameId, reviewId) {
  return sendRequest(`${BASE_URL}/${gameId}/reviews/${reviewId}`, 'DELETE');
}

export function getLikedGames() {
  return sendRequest(`${BASE_URL}/liked`, 'GET');
}

export function toggleLike(gameId) {
  return sendRequest(`${BASE_URL}/${gameId}/toggleLike`, 'PUT');
}

export function fetchLikedGames() {
  return sendRequest('/api/games/liked', 'GET');
}