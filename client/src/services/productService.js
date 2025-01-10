import api from "./api";

export const addProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const getProductsBySupplier = async (supplierId) => {
  const response = await api.get(`/products/${supplierId}`);
  return response.data;
};
