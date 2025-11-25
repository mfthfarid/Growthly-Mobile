// src/services/dashboardService.js
import { apiClient } from "../api/apiClient"; // Sesuaikan path

export const getDashboardStats = (year) => {
  console.log("Memanggil API /api/dashboard/stats dengan tahun:", year); // Untuk debugging
  // Pastikan ini MERETURN promise dari apiClient
  return apiClient.get(`/api/dashboard/stats${year ? `?year=${year}` : ""}`);
};

export const getDashboardTrends = () => {
  return apiClient.get("/api/dashboard/trends");
};
