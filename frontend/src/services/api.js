import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Debugging console log
console.log("🔍 Loaded API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
});

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
