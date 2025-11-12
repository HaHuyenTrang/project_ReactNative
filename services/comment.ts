// services/comment.ts
import api from "./api";

export const getCommentsByProduct = async (productId: number, page = 0, size = 10) => {
  const res = await api.get(`/products/${productId}/comments?page=${page}&size=${size}`);
  return res.data;
};


export const createComment = async (productId: number, data: { content: string; rating: number }) => {
  const res = await api.post(`/products/${productId}/comments`, data);
  return res.data;
};