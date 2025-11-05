import axios from "axios";

// Hàm lấy token từ AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cấu hình base URL cho backend
const api = axios.create({
  baseURL: "http://192.168.0.102:8080/api", // dùng 10.0.2.2 cho Android Emulator
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động gắn token vào mỗi request
api.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Lấy token lưu trong AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
const getToken = async () => {
  try {
    return await AsyncStorage.getItem("userToken");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export default api;
