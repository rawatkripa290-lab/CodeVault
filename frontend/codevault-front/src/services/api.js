
import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.CODE_VAULT_SRECT}/api`
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
