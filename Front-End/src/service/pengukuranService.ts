import { request } from './apiService';
import {
  AddPengukuranRequest,
  AddPengukuranResponse,
  GetPengukuranResponse,
} from '../types/types'; // atau dari file types kamu

export const addPengukuran = async (
  data: AddPengukuranRequest,
): Promise<AddPengukuranResponse> => {
  console.log('Mengirim ke API:', data);
  try {
    const response = await request('/pengukuran', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log('Response API:', response);
    return response;
  } catch (error: any) {
    console.error('Error di service:', error);
    throw error;
  }
};

export const getPengukuranByBalita = async (
  id_balita: number,
): Promise<GetPengukuranResponse> => {
  try {
    const response = await request(`/pengukuran/balita/${id_balita}`, {
      method: 'GET',
    });

    return response;
  } catch (error: any) {
    console.error('Gagal mengambil pengukuran:', error);
    throw error;
  }
};
