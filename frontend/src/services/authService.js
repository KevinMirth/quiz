import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pentru a adăuga JWT token la fiecare request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Adding Authorization header with token');
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  register: async (userData) => {
    try {
      console.log('Sending registration data:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response);
      if (error.response?.data) {
        // Dacă backend-ul returnează un obiect cu erori
        if (typeof error.response.data === 'object' && error.response.data.message) {
          throw { message: error.response.data.message };
        } else if (typeof error.response.data === 'string') {
          throw { message: error.response.data };
        }
        throw error.response.data;
      }
      throw { message: 'Registration failed - Nu se poate conecta la server' };
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        // Salvează JWT token în localStorage (și cu ambele chei pentru compatibilitate)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('authToken', response.data.token);
        console.log('Token saved successfully');
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  
  getCurrentToken: () => {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
  },

  test: async () => {
    try {
      const response = await api.get('/auth/test');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'API test failed' };
    }
  },
};

export default authService;
