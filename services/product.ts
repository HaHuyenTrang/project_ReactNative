import api from "./api";

/**
 Lấy danh sách sản phẩm (có hỗ trợ tìm kiếm, phân trang)
 */
export const getProducts = async (
  q?: string,
  page: number = 0,
  size: number = 10
) => {
  try {
    const params: any = { page, size };
    if (q) params.q = q;
    const res = await api.get("/products", { params });
    return res.data;
  } catch (error: any) {
    console.error("Get products error:", error.response?.data || error.message);
    throw new Error("Failed to load products");
  }
};

/**
  Lấy chi tiết sản phẩm theo id
 */
export const getProductById = async (id: number) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("Get product error:", error.response?.data || error.message);
    throw new Error("Failed to load product detail");
  }
};

/**
Tạo mới sản phẩm (nếu bạn có quyền admin)
 */
export const createProduct = async (data: any) => {
  try {
    const res = await api.post("/products", data);
    return res.data;
  } catch (error: any) {
    console.error("Create product error:", error.response?.data || error.message);
    throw new Error("Failed to create product");
  }
};

/** Cập nhật sản phẩm
 */
export const updateProduct = async (id: number, data: any) => {
  try {
    const res = await api.put(`/products/${id}`, data);
    return res.data;
  } catch (error: any) {
    console.error("Update product error:", error.response?.data || error.message);
    throw new Error("Failed to update product");
  }
};

/**
 Xóa sản phẩm
 */
export const deleteProduct = async (id: number) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error: any) {
    console.error("Delete product error:", error.response?.data || error.message);
    throw new Error("Failed to delete product");
  }
};
