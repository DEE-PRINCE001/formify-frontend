import api from './axiosConfig';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('formify_token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('formify_token');
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  
  saveToken: (token) => {
    localStorage.setItem('formify_token', token);
  }
};