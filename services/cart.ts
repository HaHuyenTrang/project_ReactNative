import api from "./api";

/**
  Lấy danh sách giỏ hàng của người dùng hiện tại
 */
export const getCart = async () => {
  try {
    const res = await api.get("/cart");
    return res.data;
  } catch (error: any) {
    console.error("Get cart error:", error.response?.data || error.message);
    throw new Error("Failed to fetch cart");
  }
};

/**
 Thêm sản phẩm vào giỏ
 */
export const addToCart = async (productId: number, quantity: number = 1) => {
  try {
    const res = await api.post("/cart/add", { productId, quantity });
    return res.data;
  } catch (error: any) {
    console.error("Add to cart error:", error.response?.data || error.message);
    throw new Error("Failed to add to cart");
  }
};

/**
  Cập nhật số lượng trong giỏ
 */
export const updateCartItem = async (cartItemId: number, quantity: number) => {
  try {
    const res = await api.put(`/cart/${cartItemId}`, { quantity });
    return res.data;
  } catch (error: any) {
    console.error("Update cart item error:", error.response?.data || error.message);
    throw new Error("Failed to update item quantity");
  }
};

/**
 Xóa sản phẩm khỏi giỏ
 */
export const removeCartItem = async (cartItemId: number) => {
  try {
    await api.delete(`/cart/${cartItemId}`);
  } catch (error: any) {
    console.error("Remove cart item error:", error.response?.data || error.message);
    throw new Error("Failed to remove item from cart");
  }
};

/**
 Xóa toàn bộ giỏ hàng
 */
export const clearCart = async () => {
  try {
    await api.delete("/cart/clear");
  } catch (error: any) {
    console.error("Clear cart error:", error.response?.data || error.message);
    throw new Error("Failed to clear cart");
  }
};


export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  productName: string;
  productPrice: number;
}
