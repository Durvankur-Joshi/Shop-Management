import api from "./api"; // Use the axios instance you've created

const API_URL = "suppliers";

export const addSupplier = async (supplierData) => {
  const response = await api.post("/suppliers", supplierData);
  return response.data;
};

export const getSuppliers = async () => {
  const response = await api.get("/suppliers");
  return response.data;
};

export const deleteSupplier = async (id) => {
  // Use the `api` instance instead of directly calling `axios`
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
};
