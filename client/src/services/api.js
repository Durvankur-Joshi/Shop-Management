import axios from "axios";

const api = axios.create({
  baseURL: "https://shop-management-2-qx8o.onrender.com/api", // Replace with your backend URL
});

export default api;
