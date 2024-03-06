import axios from 'axios';
import { useAuthStore } from '../stores';

const crepsshopApi = axios.create({
  baseURL: 'http://localhost:2702/api'
});

//todo: interceptors
crepsshopApi.interceptors.request.use( (config) => {
  const token = useAuthStore.getState().token;
  console.log(token);

  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
});

export {
  crepsshopApi
}