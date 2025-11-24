// Type untuk Artikel
export interface User {
  id_user: number;
  username: string;
  id_orangtua: number;
  nama_orangtua: string;
  no_hp: string;
  alamat: string;
  pendapatan: string; // ENUM: "Rendah", "Sedang", "Tinggi"
  wilayah: string; // ENUM: "Pegunungan", "Dataran Rendah", dll
  role: string; // "admin", "orangtua"
}

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

// Rekomendasi Makanan
export interface FoodRecommendationItem {
  Kategori: string;
  'Nama Pangan': string;
  'Kandungan Gizi Utama': string;
  'Manfaat untuk Anak Stunting': string;
}

export interface FoodRecommendationResponse {
  wilayah_tumbuh: string;
  rekomendasi: FoodRecommendationItem[];
}

// Prediksi
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
