import axios from 'axios';

const api = axios.create({
  baseURL: 'https://formify-1-ozy6.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('formify_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to catch 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('formify_token');
      window.location.href = '/login'; // Force redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;