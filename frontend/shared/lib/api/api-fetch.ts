import { ApiResponse } from "../../types/api-response.type";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiFetchOptions<T> {
  url: string;
  method?: HttpMethod;
  data?: T | FormData;
  headers?: HeadersInit;
}


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';


export async function apiFetch<TResponse = unknown, TBody = unknown>({url, method = 'GET', data, headers = {}}: ApiFetchOptions<TBody>): Promise<ApiResponse<TResponse>> {
  let token;
  let lang;

  if(typeof window !== 'undefined'){
    token = localStorage?.getItem('token');
    lang = localStorage?.getItem('lang') ;
  }

  const isFormData = data instanceof FormData;

  const finalHeaders: HeadersInit = {
    'Accept': 'application/json',
    'Accept-Language': lang ?? 'en',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...headers
  };

  const response = await fetch(`${BASE_URL}/${url}`, {
    method,
    // credentials: 'include',
    headers: finalHeaders,
    ...(data && method !== 'GET'
      ? {
          body: isFormData ? data : JSON.stringify(data)
        }
      : {})
  });

  if (!response.ok) {
    const errorData :  ApiResponse<TResponse> = await response.json().catch(() => null) ;
    throw {
      ...errorData   
    } 
  }
  // if (response.status === 204) {
  //   return null as ApiResponse<TResponse>;
  // }

  return (await response.json()) as ApiResponse<TResponse>;
}
