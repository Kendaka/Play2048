import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // backend API base URL

// token management functions for localStorage
const getToken = () => localStorage.getItem('token');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setToken = (token) => localStorage.setItem('token', token);
const setRefreshToken = (refreshToken) => localStorage.setItem('refreshToken', refreshToken);
const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// flags and queue for handling token refresh
let isRefreshing = false;
let refreshSubscribers = [];

// notify all subscribers when a new token is available
const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// queue a callback to be retried after token refresh
const addSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// refresh the access token using the refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
    const newToken = response.data.token;
    setToken(newToken);
    return newToken;
  } catch (error) {
    clearTokens();
    throw new Error('Unable to refresh token');
  }
};

// perform an authenticated request with automatic token handling
export const authenticatedRequest = async (url, method = 'GET', data = null) => {
  let token = getToken();

  try {
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
    const response = await axios({ method, url, headers, data });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // attempt token refresh if the request was unauthorized
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;
          onRefreshed(newToken);
        } catch {
          throw new Error('Session expired. Please log in again.');
        }
      }

      // retry the request after token refresh
      return new Promise((resolve) => {
        addSubscriber(() => resolve(authenticatedRequest(url, method, data)));
      });
    } else {
      throw new Error(error.response?.data?.message || 'Request failed');
    }
  }
};

// handle user login and store tokens
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token, refreshToken } = response.data;
    setToken(token);
    setRefreshToken(refreshToken);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// handle user registration
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// clear tokens during logout
export const logoutUser = () => {
  clearTokens();
};

// fetch leaderboard data
export const fetchLeaderboard = async () => {
  const url = 'http://localhost:5000/api/auth/leaderboard';
  try {
    const response = await authenticatedRequest(url);
    return response;
  } catch (error) {
    throw new Error('Error fetching leaderboard data');
  }
};
