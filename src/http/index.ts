import axios, { AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default API;
