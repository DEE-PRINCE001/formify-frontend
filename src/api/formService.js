import api from './axiosConfig';

export const formService = {
  getForms: async () => {
    const response = await api.get('/forms');
    return response.data;
  },

  createForm: async (formData) => {
    const response = await api.post('/forms', formData);
    return response.data;
  },
  
  deleteForm: async (id) => {
    await api.delete(`/forms/${id}`);
  },

  getFormById: async (id) => {
    const response = await api.get(`/forms/${id}`);
    return response.data;
  },

  // (Public)
  submitResponse: async (id, responseData) => {
    const response = await api.post(`/forms/${id}/responses`, responseData);
    return response.data;
  },

  getFormResponses: async (id) => {
    const response = await api.get(`/forms/${id}/responses`);
    return response.data;
  }
};