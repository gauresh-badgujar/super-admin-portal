import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiGet<T>(
  url: string,
  signal?: AbortSignal
): Promise<T> {
  const response = await api.get<T>(url, {
    signal,
  });

  return response.data;
}

export async function apiPost<T, D>(
  url: string,
  data: D
): Promise<T> {
  const response = await api.post<T>(url, data);

  return response.data;
}

export async function apiPut<T, D>(
  url: string,
  data: D
): Promise<T> {
  const response = await api.put<T>(url, data);

  return response.data;
}

export async function apiDelete<T>(
  url: string
): Promise<T> {
  const response = await api.delete<T>(url);

  return response.data;
}