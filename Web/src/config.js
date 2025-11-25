// src/config.js (untuk Vite)
// Gunakan import.meta.env, dan gunakan nama variabel yang diawali VITE_
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081"; // Default fallback

export { API_BASE_URL };
