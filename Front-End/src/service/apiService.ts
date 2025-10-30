// src/service/apiService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.100.13:5000/api';

export const request = async (endpoint: string, options: RequestInit = {}) => {
  // 🔑 Ambil token dari AsyncStorage
  const token = await AsyncStorage.getItem('userToken');
  console.log('🎯 Token yang dikirim ke', endpoint, ':', token);

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), // kirim hanya jika ada
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  return response.json();
};
