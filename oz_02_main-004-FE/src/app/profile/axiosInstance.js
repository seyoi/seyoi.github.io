import axios from 'axios';

// Function to get access token from cookies
const getAccessToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; access_token=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Function to get refresh token from cookies
const getRefreshToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; refresh_token=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const axiosInstance = axios.create({
  baseURL: 'https://54.180.86.80', // Base URL of your backend API
  withCredentials: true, // Ensure cookies are sent with requests
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        const response = await axios.post(
          'https://54.180.86.80/api/v1/users/refresh/',
          {
            refresh: refreshToken,
          },
          {
            withCredentials: true,
          },
        );

        const newAccessToken = response.data.access;
        document.cookie = `access_token=${newAccessToken}; path=/; secure; samesite=None;`;

        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Error refreshing token:', err);
        // Handle token refresh failure (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
