import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig
  } from 'axios';
  
  const apiAxios: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL ,
    // timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  apiAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        const lang = localStorage.getItem('lang') || 'ar';
        config.headers['Accept-Language'] = lang;
      }
      
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  apiAxios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default apiAxios;