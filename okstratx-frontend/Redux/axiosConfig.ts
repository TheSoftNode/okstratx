import axios from "axios";

// Base URL for the API
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Create an axios instance with default configurations
const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds
});

// Request interceptor - could add auth tokens here
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth token here if needed
        // const token = localStorage.getItem("token");
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - for handling common error patterns
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle different error statuses here
        const { response } = error;
        if (response && response.status === 401) {
            // Handle unauthorized error - perhaps redirect to login
            console.error("Unauthorized access, please login");
            // Optional: redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;