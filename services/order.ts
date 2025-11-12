import api from "./api";

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  status: string;
  createdAt: string;
  totalAmount: number;
  items: OrderItem[];
  paymentMethod?: string;
  shippingAddress?: string;
  trackingNumber?: string;
}

// Lấy danh sách đơn hàng của user
export const getMyOrders = async (page = 0, size = 10): Promise<Order[]> => {
  try {
    const res = await api.get(`/orders?page=${page}&size=${size}`);
    return res.data;
  } catch (err: any) {
    console.error("Get orders error:", err.response?.data || err.message);
    return [];
  }
};

// Lấy chi tiết 1 đơn hàng
export const getOrder = async (id: number): Promise<Order | null> => {
  try {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  } catch (err: any) {
    console.error("Get order error:", err.response?.data || err.message);
    return null;
  }
};

// Hủy đơn hàng
export const cancelOrder = async (id: number): Promise<Order | null> => {
  try {
    const res = await api.put(`/orders/${id}/cancel`);
    return res.data;
  } catch (err: any) {
    console.error("Cancel order error:", err.response?.data || err.message);
    return null;
  }
};

// Tạo đơn hàng mới
export const createOrder = async (orderData: Partial<Order>): Promise<Order | null> => {
  try {
    const res = await api.post(`/orders`, orderData);
    return res.data;
  } catch (err: any) {
    console.error("Create order error:", err.response?.data || err.message);
    return null;
  }
};
