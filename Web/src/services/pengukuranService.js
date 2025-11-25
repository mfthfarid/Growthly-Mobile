// src/services/pengukuranGiziService.js
import { apiClient } from "../api/apiClient";

export const getPengukuranList = () => {
  return apiClient.get("/api/pengukuran"); // Sesuaikan endpoint jika berbeda
};

export const addPengukuran = (data) => {
  return apiClient.post("/api/pengukuran", data);
};

export const updatePengukuran = (id, data) => {
  return apiClient.put(`/api/pengukuran/${id}`, data);
};

export const deletePengukuran = (id) => {
  return apiClient.delete(`/api/pengukuran/${id}`);
};

export const getGiziStats = () => {
  return apiClient.get("/api/pengukuran/stats");
};
