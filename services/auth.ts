// // services/auth.ts

// const getBaseUrl = () => {
//   // Nếu chạy trên thiết bị hoặc giả lập
//   // Dùng IP máy thật (đổi cho đúng IP máy của bạn)
//   const localApi = "http://10.0.2.2:8080/api/auth"; // Android Emulator
//   const physicalDeviceApi = "http://192.168.1.100:8080/api/auth"; // ⚠️ đổi IP này cho đúng máy bạn

//   // // Nếu chạy web (ví dụ Expo Web)
//   // if (Constants.executionEnvironment === "web") {
//   //   return "http://localhost:8080/api/auth";
//   // }

//   // Mặc định cho mobile app
//   return localApi;
// };

// const BASE_URL = getBaseUrl();

// export const login = async (email: string, password: string): Promise<string> => {
//   try {
//     const res = await fetch(`${BASE_URL}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       throw new Error(errText || "Login failed");
//     }

//     const data = await res.json();
//     if (!data.token) {
//       throw new Error("No token returned from server");
//     }

//     return data.token;
//   } catch (error: any) {
//     console.error("Login error:", error.message);
//     throw new Error(error.message || "Network error");
//   }
// };

// export const register = async (
//   fullName: string,
//   email: string,
//   password: string,
//   phone: string,
//   address: string
// ) => {
//   try {
//     const res = await fetch(`${BASE_URL}/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fullName, email, password, phone, address }),
//     });

//     if (!res.ok) {
//       const err = await res.text();
//       throw new Error(err || "Register failed");
//     }

//     return await res.json();
//   } catch (error: any) {
//     console.error("Register error:", error.message);
//     throw new Error(error.message || "Network error");
//   }
// };



// services/auth.ts
import api from "./api";

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const res = await api.post("/auth/login", { email, password });

    if (!res.data?.token) {
      throw new Error("No token returned from server");
    }

    return res.data.token;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (
  fullName: string,
  email: string,
  password: string,
  phone: string,
  address: string
) => {
  try {
    const res = await api.post("/auth/register", {
      fullName,
      email,
      password,
      phone,
      address,
    });
    return res.data;
  } catch (error: any) {
    console.error("Register error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Register failed");
  }
};

// ✅ Lấy thông tin người dùng hiện tại
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error: any) {
    console.error("Get user error:", error.response?.data || error.message);
    throw new Error("Failed to fetch user info");
  }
};
