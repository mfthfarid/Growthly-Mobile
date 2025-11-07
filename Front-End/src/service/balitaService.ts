import { request } from './apiService';

interface BalitaData {
  nama_balita: string;
  tgl_lahir: string; // format: "YYYY-MM-DD"
  jenis_kelamin: 'L' | 'P';
}

export const getMyBalita = async () => {
  try {
    const response = await request('/balita/mybalita', { method: 'GET' });
    return response;
  } catch (error: any) {
    console.log('❌ Error API getMyBalita:', error);
    throw error;
  }
};

export const addBalita = async (data: any) => {
  return await request('/balita/add', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
