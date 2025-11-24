// src/screens/DetailAnakScreen.tsx
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from './styles/DetailAnakScreenStyles';
import { getPengukuranByBalita } from '../service/pengukuranService';
import { Pengukuran } from '../types/types';
import { User, Balita } from '../types/types';
// import { getMyBalita } from '../service/balitaService';
import { recommendFood, FoodRecommendationItem } from '../service/mlService';
import PertumbuhanChart from '../components/PertumbuhanChart';
import RekomendasiMakanan from '../components/RekomendasiMakanan';

const getUserData = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error('Error fetching user data:', e);
    return null;
  }
};

// ✅ Tambahkan fungsi format tanggal
const formatTanggal = (dateString: string): string => {
  // Cara 1: Format DD/MM/YYYY
  // const [year, month, day] = dateString.split('-');
  // return `${day}-${month}-${year}`;

  // Cara 2: Format DD MMM YYYY (misal: 18 Nov 2025)
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const hitungUmur = (tglLahir: string, tglAcuan: Date = new Date()): string => {
  const lahir = new Date(tglLahir);
  let umurTahun = tglAcuan.getFullYear() - lahir.getFullYear();
  let umurBulan = tglAcuan.getMonth() - lahir.getMonth();

  if (tglAcuan.getDate() < lahir.getDate()) {
    umurBulan--;
  }
  if (umurBulan < 0) {
    umurTahun--;
    umurBulan += 12;
  }

  return `${umurTahun} tahun ${umurBulan} bulan`;
};

// Fungsi untuk styling status gizi
const getStatusGiziStyle = (status: string) => {
  switch (status) {
    case 'Normal':
      return {
        backgroundColor: { backgroundColor: '#d4edda' },
        textColor: { color: '#155724' },
      };
    case 'Gizi Buruk':
      return {
        backgroundColor: { backgroundColor: '#f8d7da' },
        textColor: { color: '#721c24' },
      };
    case 'Gizi Kurang':
      return {
        backgroundColor: { backgroundColor: '#fff3cd' },
        textColor: { color: '#856404' },
      };
    case 'Stunting':
      return {
        backgroundColor: { backgroundColor: '#e2e3e5' },
        textColor: { color: '#383d41' },
      };
    default:
      return {
        backgroundColor: { backgroundColor: '#f8f9fa' },
        textColor: { color: '#6c757d' },
      };
  }
};

export default function DetailAnakScreen({ route }: { route: any }) {
  const { dataAnak }: { dataAnak: Balita } = route.params;
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);

  const [pengukuran, setPengukuran] = useState<Pengukuran[]>([]);
  const [umur, setUmur] = useState<string>('');

  const [rekomendasi, setRekomendasi] = useState<
    FoodRecommendationItem[] | null
  >(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pengukuranData = await getPengukuranByBalita(dataAnak.id_balita);
        setPengukuran(pengukuranData);
        setUmur(hitungUmur(dataAnak.tgl_lahir));
      } catch (error) {
        console.error('Gagal mengambil data pengukuran:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataAnak.id_balita]);

  // Rekomendasi Makanan
  const handleRecommend = async () => {
    // Jika sudah ada rekomendasi, langsung tampilkan modal
    if (rekomendasi && rekomendasi.length > 0) {
      setModalVisible(true);
      return;
    }

    // Jika belum ada, fetch data
    setLoading(true);

    try {
      const user = await AsyncStorage.getItem('userData');
      if (!user) {
        Alert.alert(
          'Error',
          'Data pengguna tidak ditemukan. Silakan login kembali.',
        );
        return;
      }
      const parsedUser: User = JSON.parse(user);

      const result = await recommendFood({
        wilayah_tumbuh: parsedUser.wilayah,
        jumlah: 10,
      });
      setRekomendasi(result.rekomendasi);
      setModalVisible(true); // Buka modal setelah data diterima
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh Makanan
  const handleRefresh = async () => {
    // Reset rekomendasi dan langsung fetch ulang
    setRekomendasi(null); // Kosongkan dulu
    setModalVisible(true); // Biarkan modal tetap terbuka atau buka lagi
    setLoading(true);

    try {
      const user = await AsyncStorage.getItem('userData');
      if (!user) {
        Alert.alert(
          'Error',
          'Data pengguna tidak ditemukan. Silakan login kembali.',
        );
        return;
      }
      const parsedUser: User = JSON.parse(user);

      const result = await recommendFood({
        wilayah_tumbuh: parsedUser.wilayah,
        jumlah: 5,
      });
      setRekomendasi(result.rekomendasi);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Komponen header yang akan ditampilkan di atas list pengukuran
  const getAvatarInitial = () => dataAnak.nama_balita.charAt(0).toUpperCase();

  // Urutkan dari terbaru ke terlama
  const sortedPengukuran = [...pengukuran].sort(
    (a, b) =>
      new Date(b.tanggal_ukur).getTime() - new Date(a.tanggal_ukur).getTime(),
  );

  const ListHeader = () => (
    <>
      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{getAvatarInitial()}</Text>
        </View>
        <Text style={styles.nama}>{dataAnak.nama_balita}</Text>

        <View style={styles.profileInfoRow}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoLabel}>Lahir</Text>
            <Text style={styles.profileInfoValue}>
              {formatTanggal(dataAnak.tgl_lahir)}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoLabel}>Kelamin</Text>
            <Text style={styles.profileInfoValue}>
              {dataAnak.jenis_kelamin}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoLabel}>Umur</Text>
            <View style={styles.umurStackContainer}>
              <Text style={styles.umurTahun}>
                {umur.split(' tahun ')[0]} tahun
              </Text>
              <Text style={styles.umurBulan}>{umur.split(' tahun ')[1]}</Text>
            </View>
            {/* <Text style={styles.profileInfoValue}>{umur}</Text> */}
          </View>
        </View>
      </View>

      {/* INFO TERAKHIR */}
      {pengukuran.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Info Terakhir</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxLabel}>Umur Saat Diukur</Text>
                <Text style={styles.infoBoxValue}>
                  {hitungUmur(
                    dataAnak.tgl_lahir,
                    new Date(pengukuran[0].tanggal_ukur),
                  )}
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxLabel}>Berat</Text>
                <Text style={styles.infoBoxValue}>
                  {pengukuran[0].berat_badan} kg
                </Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxLabel}>Tinggi</Text>
                <Text style={styles.infoBoxValue}>
                  {pengukuran[0].tinggi_badan} cm
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxLabel}>Status Gizi</Text>
                <View
                  style={[
                    styles.statusGiziBadge, // Gunakan style badge dari history
                    getStatusGiziStyle(pengukuran[0].status_gizi)
                      .backgroundColor, // Warna background
                  ]}
                >
                  <Text
                    style={[
                      styles.statusGiziText, // Gunakan style text dari history
                      getStatusGiziStyle(pengukuran[0].status_gizi).textColor, // Warna text
                    ]}
                  >
                    {pengukuran[0].status_gizi}
                  </Text>
                </View>
                {/* <Text style={styles.infoBoxValue}>
                  {pengukuran[0].status_gizi}
                </Text> */}
              </View>
            </View>
          </View>
        </>
      )}

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        {/* Tombol untuk menampilkan rekomendasi */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRecommend}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Memuat...' : 'Rekomendasikan Makanan'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CHART */}
      <View style={styles.chartContainer}>
        <PertumbuhanChart pengukuran={pengukuran} />
      </View>

      {/* HISTORY TITLE */}
      <Text style={styles.sectionTitle}>Histori Pengukuran</Text>
    </>
  );

  const renderPengukuran = ({ item }: { item: Pengukuran }) => (
    <View style={styles.pengukuranItem}>
      <Text style={styles.pengukuranTanggal}>
        📅 {formatTanggal(item.tanggal_ukur)}
      </Text>

      <View style={styles.pengukuranRow}>
        <Text style={styles.pengukuranLabel}>Tinggi</Text>
        <Text style={styles.pengukuranValue}>{item.tinggi_badan} cm</Text>
      </View>

      <View style={styles.pengukuranRow}>
        <Text style={styles.pengukuranLabel}>Berat</Text>
        <Text style={styles.pengukuranValue}>{item.berat_badan} kg</Text>
      </View>

      <View style={styles.pengukuranRow}>
        <Text style={styles.pengukuranLabel}>Posyandu</Text>
        <Text style={styles.pengukuranValue}>{item.nama_posyandu}</Text>
      </View>

      <View style={styles.statusGiziPengukuran}>
        <Text style={styles.statusGiziLabel}>Status Gizi</Text>
        <View
          style={[
            styles.statusGiziBadge,
            getStatusGiziStyle(item.status_gizi).backgroundColor,
          ]}
        >
          <Text
            style={[
              styles.statusGiziText,
              getStatusGiziStyle(item.status_gizi).textColor,
            ]}
          >
            {item.status_gizi}
          </Text>
        </View>
      </View>

      {item.catatan && (
        <Text style={styles.catatanText}>📝 {item.catatan}</Text>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>📊 Belum ada data pengukuran</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7b2cbf" />
      </View>
    );
  }

  return (
    <>
      <FlatList
        style={styles.container}
        ListHeaderComponent={ListHeader}
        data={sortedPengukuran}
        renderItem={renderPengukuran}
        keyExtractor={(item, index) =>
          item.id_gizi?.toString() || `pengukuran-${index}`
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={{ paddingBottom: 24 }}
        scrollIndicatorInsets={{ right: 1 }}
      />

      {/* ✅ Panggil komponen rekomendasi di sini */}
      <RekomendasiMakanan
        visible={modalVisible}
        loading={loading}
        rekomendasi={rekomendasi || []}
        onClose={() => setModalVisible(false)}
        onRefresh={handleRefresh}
      />
    </>
  );
}
