import { request } from './apiService';

// Ambil semua artikel
export const getArtikel = async () => {
  return await request('/artikel', {
    method: 'GET',
  });
};

// Ambil artikel berdasarkan ID
export const getArtikelById = async (id_artikel: number) => {
  return await request(`/artikel/${id_artikel}`, {
    method: 'GET',
  });
};
