// src/service/pengukuranService.ts
import { request } from './apiService';

type AddPengukuranRequest = {
  id_balita: string;
  tanggal_ukur: string;
  tinggi_badan: number;
  berat_badan: number;
  status_gizi: string;
  catatan?: string;
  nama_posyandu: string;
};

type AddPengukuranResponse = {
  message: string;
  pengukuran: {
    id_pengukuran: string;
    id_balita: string;
    tanggal_ukur: string;
    tinggi_badan: number;
    berat_badan: number;
    status_gizi: string;
    catatan: string | null;
    nama_posyandu: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const addPengukuran = async (
  addPengukuranRequest: AddPengukuranRequest,
): Promise<AddPengukuranResponse> => {
  console.log('Mengirim ke API:', addPengukuranRequest);
  try {
    const response = await request('/pengukuran', {
      method: 'POST',
      body: JSON.stringify(addPengukuranRequest),
    });
    console.log('Response API:', response);
    return response;
  } catch (error: any) {
    console.error('Error di service:', error); // Tambahkan log
    // Error sudah ditangani oleh `request`, Tinggal dilempar
    throw error;
  }
};

// export const addPengukuran = async (
//    AddPengukuranRequest
// ): Promise<AddPengukuranResponse> => {
//   try {
//     const response = await request('/pengukuran', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });

//     return response;
//   } catch (error: any) {
//     // Error sudah ditangani oleh `request`, tinggal dilempar
//     throw error;
//   }
// };
