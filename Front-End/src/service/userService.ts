import { request } from './apiService';

export const registerUser = async (userData: {
  username: string;
  password: string;
  nama_orangtua: string;
  no_hp: string;
  alamat: string;
  pendapatan: number;
  wilayah: 'dataran_rendah' | 'pegunungan';
}) => {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const forgotPassword = async (forgotData: {
  username: string;
  newPassword: string;
}) => {
  return request('/auth/lupa-password', {
    method: 'POST',
    body: JSON.stringify(forgotData),
  });
};

export const loginUser = async (loginData: {
  username: string;
  password: string;
}) => {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
  });
};

export const updateProfile = async (
  id_user: number,
  profileData: {
    nama_orangtua: string;
    no_hp: string;
    alamat: string;
  },
) => {
  return request(`/auth/updateProfile/${id_user}`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

export const updatePassword = async (
  id_user: number,
  passwordData: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  return request(`/auth/updatePassword/${id_user}`, {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  });
};
