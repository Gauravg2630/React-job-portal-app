export const API_URL = 'https://react-job-portal-app-backend.onrender.com/api';

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
