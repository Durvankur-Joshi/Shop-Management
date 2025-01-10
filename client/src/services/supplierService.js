import api from "./api";

export const addSupplier = async (supplierData) => {
  const response = await api.post("/suppliers", supplierData);
  return response.data;
};

export const getSuppliers = async () => {
  const response = await api.get("/suppliers");
  return response.data;
};
