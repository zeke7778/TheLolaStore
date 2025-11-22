import api from "./api";

// Fetch all products
export const getProducts = async (params = {}) => {
  const res = await api.get("/products", { params });
  return res.data;   // Always array
};

// Get product by id
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;   // Always a single object
};

// Create product
export const createProduct = async (payload) => {
  const res = await api.post("/products", payload, {
    headers: payload instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : {},
  });
  return res.data;
};

// Update product
export const updateProduct = async (id, payload) => {
  const res = await api.put(`/products/${id}`, payload);
  return res.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
