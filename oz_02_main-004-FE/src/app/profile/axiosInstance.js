import axios from 'axios';

// Function to get access token from cookies
const getAccessToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; access_token=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const axiosInstance = axios.create({
  baseURL: 'https://54.180.86.80/', // Base URL of your backend API
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
    if (error.response && error.response.status === 401) {
      // Handle token expiration or unauthorized access
      console.error('Unauthorized access - redirecting to login.');
      // Redirect to login page or show a login modal
      window.location.href = '/login'; // or any appropriate action
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
