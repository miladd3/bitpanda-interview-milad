import axios from 'axios';

import todo from '@/api/todo';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

const api = {
  todo: todo(axiosInstance),
};

export default api;
