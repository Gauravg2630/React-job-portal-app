export const API_URL = 'http://localhost:4000/api';

export async function fetchWithAuth(url, options = {}) {
  return fetch(API_URL + url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
}
