import axios, {type InternalAxiosRequestConfig} from "axios";
import {useAuthStore} from "@/stores/authStore.ts";


const cvAPI = axios.create({
  baseURL: "http://localhost:8000",
});

cvAPI.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
}, (error: any): Promise<never> => {
  return Promise.reject(error);
});


export {cvAPI};
