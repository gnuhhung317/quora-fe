import axios from "axios";
import Router from "next/router";

// Tạo instance axios
const apiClient = axios.create({
  baseURL: "http://localhost:8080", // URL API từ biến môi trường
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm Interceptor để tự động thêm Bearer Token
apiClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (hoặc từ memory, tùy bạn lưu trữ)
    const token = localStorage.getItem("token");

    if (token) {
      // Thêm token vào header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response.status === 401) {
      // Refresh token logic here
      const newToken = await refreshToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return apiClient.request(error.config);
    }
    return Promise.reject(error);
  }
);



export default apiClient;
