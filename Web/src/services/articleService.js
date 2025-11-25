import { apiClient } from "../api/apiClient";

export const getArtikelStats = () => {
  return apiClient.get("/api/artikel/stats");
};

// Tambahkan fungsi untuk menambah artikel
export const addArtikel = async (artikelData) => {
  return apiClient.post("/api/artikel", artikelData);
};

// Tambahkan fungsi untuk mengambil semua artikel
export const getArtikelList = async () => {
  return apiClient.get("/api/artikel");
};

export const deleteArtikel = (id) => {
  return apiClient.delete(`/api/artikel/${id}`);
};
export const updateArtikel = async (id, artikelData, imageFile = null) => {
  const formData = new FormData();
  formData.append("judul", artikelData.judul);
  formData.append("isi", artikelData.isi);
  formData.append("penulis", artikelData.penulis);
  formData.append("nama_posyandu", artikelData.nama_posyandu || "");

  if (imageFile) {
    formData.append("foto", imageFile);
  }

  return apiClient.put(`/api/artikel/${id}`, formData);
};
