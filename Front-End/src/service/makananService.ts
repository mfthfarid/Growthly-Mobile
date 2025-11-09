import { request } from './apiService';

// Ambil semua artikel
export const getMakanan = async () => {
  return await request('/makanan', {
    method: 'GET',
  });
};

// Ambil makanan berdasarkan ID
export const getMakananById = async (id_makanan: number) => {
  return await request(`/makanan/${id_makanan}`, {
    method: 'GET',
  });
};
