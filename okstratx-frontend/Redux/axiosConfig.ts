import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://okstratx-api.onrender.com";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response && response.status === 401) {
            console.error("Unauthorized access, please login");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;