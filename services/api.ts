

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Hàm lấy token
const getToken = async () => {
  try {
    return await AsyncStorage.getItem("userToken");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// Cấu hình base URL
const api = axios.create({
  baseURL: "http://192.168.0.102:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor gắn token
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      // Đảm bảo headers tồn tại
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No token found in AsyncStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
