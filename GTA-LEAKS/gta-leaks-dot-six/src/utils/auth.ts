export const saveToken = (token: string) =>
  localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const removeToken = () => localStorage.removeItem("token");

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5173/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});
