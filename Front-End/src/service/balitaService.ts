import { request } from './apiService';

interface BalitaData {
  nama_balita: string;
  tgl_lahir: string; // format: "YYYY-MM-DD"
  jenis_kelamin: 'L' | 'P';
}

export const addBalita = async (data: BalitaData) => {
  return await request('/balita', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getMyBalita = async () => {
  return await request('/balita/mybalita', {
    method: 'GET',
  });
};
