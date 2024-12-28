import axios from "axios";
import { toast } from "react-toastify";

// Lấy token từ localStorage hoặc nơi lưu trữ phù hợp
const getToken = () => {
    return localStorage.getItem("accessToken") || "";
};

// Tạo instance Axios
const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/v1", // Base URL của API
    headers: {
        "Content-Type": "application/json",
    },
});

// Thêm Interceptor để tự động chèn token vào các yêu cầu
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            if (!config.url?.includes("/auth") && !config.url?.includes("/register")) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm Interceptor cho các phản hồi để xử lý lỗi 401
apiClient.interceptors.response.use(
    (response) => {
        if (response.data.code !== 200) {
            toast.error(response.data.message);
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Chuyển hướng người dùng về trang đăng nhập
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;