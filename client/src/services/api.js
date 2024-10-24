import axios from 'axios';

const api = axios.create({
  baseURL: 'https://negotiation-system-backend.onrender.com/api',
});

export default api;
