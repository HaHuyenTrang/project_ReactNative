// services/user.ts
import api from "./api";

export const getUserProfile = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error: any) {
    console.error("Get user profile error:", error.message);
    throw new Error(error.response?.data?.message || "Failed to load user info");
  }
};
