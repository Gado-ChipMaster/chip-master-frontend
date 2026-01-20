import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const chipService = {
  search: (query) => api.get(`/api/search/?q=${query}`),
  contribute: (data) => api.post('/api/learn/', data),
  getServices: () => api.get('/api/services/'),
  login: (username, password) => api.post('/auth/jwt/create/', { username, password }),
  register: (userData) => api.post('/auth/users/', userData),
  getProfile: () => api.get('/auth/users/me/'),
  updateProfile: (data) => api.patch('/auth/users/me/', data),
};

export default api;
