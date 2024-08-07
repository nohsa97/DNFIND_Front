import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DB_HOST,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
  withCredentials: true,
});

export default axiosInstance;
