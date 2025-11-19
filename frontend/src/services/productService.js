import api from "./api";

export const getProducts = async (params = {}) => {
  const res = await api.get(`/products`, { params });
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (payload) => {
  const res = await api.post(`/products`, payload, {
    headers: payload instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : {},
  });
  return res.data;
};

export const updateProduct = async (id, payload) => {
  const res = await api.put(`/products/${id}`, payload);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
