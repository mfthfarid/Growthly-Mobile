// Type untuk Artikel
export interface Artikel {
  id_artikel: number;
  judul: string;
  isi: string;
  penulis: string;
  foto: string;
}

// Type untuk Makanan
export interface Makanan {
  id_makanan: number;
  nama_makanan: string;
  isi: string;
  foto: string;
}

// Type untuk Anak
export interface Anak {
  id_anak: number;
  nama: string;
  usia: number;
  foto: string;
  // tambahkan field lain jika ada
}

export interface Balita {
  id_balita: number;
  nama_balita: string;
  tgl_lahir: string;
  jenis_kelamin: 'L' | 'P';
  id_orangtua: number;
}

// Gabungkan semua route yang digunakan di semua Stack.Navigator di sini
export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;

  // Home Stack (di dalam Tab)
  HomeScreen: undefined;
  Notifikasi: undefined;
  Artikel: undefined;
  DetailArtikel: { article: Artikel };
  Makanan: undefined;
  DetailMakanan: { food: Makanan };
  Prediksi: undefined;
  Pengukuran: undefined;

  // Menu Anak Stack (di dalam Tab)
  MenuAnakScreen: undefined;
  TambahAnak: undefined;
  DetailAnak: { child: Anak };

  // Profile Stack (di dalam Tab)
  ProfileScreen: undefined;
  EditProfile: undefined;

  // Tambahkan route lain sesuai kebutuhan
};
