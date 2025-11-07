
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
