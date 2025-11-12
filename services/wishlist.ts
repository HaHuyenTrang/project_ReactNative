import api from "./api";

// Lấy danh sách sản phẩm trong wishlist
export const getWishlist = async () => {
  try {
    const res = await api.get("/wishlist");
    return res.data; // array ProductDto
  } catch (err) {
    console.error("Failed to fetch wishlist:", err);
    return [];
  }
};

// Thêm sản phẩm vào wishlist
export const addToWishlist = async (productId: number) => {
  try {
    const res = await api.post(`/wishlist/${productId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to add to wishlist:", err);
    throw err;
  }
};

// Xóa sản phẩm khỏi wishlist
export const removeFromWishlist = async (productId: number) => {
  try {
    await api.delete(`/wishlist/${productId}`);
  } catch (err) {
    console.error("Failed to remove from wishlist:", err);
    throw err;
  }
};
