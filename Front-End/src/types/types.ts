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

export type Pengukuran = {
  id_gizi?: string; // opsional saat kirim (belum dibuat)
  id_balita: string;
  tanggal_ukur: string;
  tinggi_badan: number;
  berat_badan: number;
  status_gizi: string;
  catatan?: string;
  nama_posyandu: string;
  createdAt?: string; // hanya ada di response
  updatedAt?: string; // hanya ada di response
};

export type AddPengukuranRequest = Pengukuran;

export type AddPengukuranResponse = {
  message: string;
  pengukuran: Pengukuran; // response dari API
};

export type GetPengukuranResponse = Pengukuran[];

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
