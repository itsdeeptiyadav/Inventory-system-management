import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-system-management-production.up.railway.app/"
});

export default api;