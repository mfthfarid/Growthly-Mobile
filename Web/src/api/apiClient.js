// src/api/apiClient.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Helper untuk request API dengan token otomatis & error handling
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem("token");

  // Siapkan headers dasar
  const headers = {
    // "Content-Type": "application/json", // <-- DIHAPUS dari sini
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers, // Izinkan override headers dari luar
  };

  const config = {
    method: options.method || "GET",
    headers, // Gunakan headers yang sudah disiapkan
    ...options,
  };

  // Jika ada body dan itu BUKAN FormData, stringify dan tambah Content-Type
  if (options.body && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
    // Tambahkan Content-Type hanya jika body adalah JSON
    config.headers["Content-Type"] = "application/json";
  }
  // Jika body adalah FormData, biarkan browser tangani Content-Type-nya

  const response = await fetch(url, config);

  // Parse response JSON baik sukses maupun error
  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = { message: "Terjadi kesalahan pada server" };
  }

  if (!response.ok) {
    const errorMessage = data.message || "Permintaan gagal";
    throw new Error(errorMessage);
  }

  return data;
};

// Export sebagai objek dengan method helper
export const apiClient = {
  get: (endpoint) => apiRequest(endpoint),
  post: (endpoint, body) => apiRequest(endpoint, { method: "POST", body }), // <-- body bisa FormData atau JSON
  put: (endpoint, body) => apiRequest(endpoint, { method: "PUT", body }), // <-- body bisa FormData atau JSON
  delete: (endpoint) => apiRequest(endpoint, { method: "DELETE" }),
};
