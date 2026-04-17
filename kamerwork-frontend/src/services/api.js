// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api", // backend URL with servlet context path
  timeout: 5000,
});

export default api;