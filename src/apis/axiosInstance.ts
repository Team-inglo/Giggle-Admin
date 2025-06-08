import axios from "axios";
import { postReissueToken } from "@apis/account/accounts";
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "@utils/tokenUtil";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 이미 재시도한 요청이면 그냥 에러
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (!getRefreshToken()) {
      // 리프레시 토큰 없으면 로그아웃 처리
      removeAccessToken();
      removeRefreshToken();

      window.location.href = "/login";
      return Promise.reject(error);
    }

    // 토큰 재발급 시도
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      console.log("Refreshing token...");
      const { access_token: newAccessToken } = await postReissueToken({
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      setAccessToken(newAccessToken);
      axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      removeAccessToken();
      removeRefreshToken();

      processQueue(refreshError, null);
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
