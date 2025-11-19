// src/screens/DetailAnakScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles/DetailAnakScreenStyles';
import { getPengukuranByBalita } from '../service/pengukuranService';
import { Pengukuran } from '../types/types';
import { getMyBalita } from '../service/balitaService';
import PertumbuhanChart from '../components/PertumbuhanChart';

interface Balita {
  id_balita: number;
  id_orangtua: number;
  nama_balita: string;
  tgl_lahir: string;
  jenis_kelamin: 'L' | 'P';
}

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

export default function DetailAnakScreen({ route }: { route: any }) {
  const { dataAnak }: { dataAnak: Balita } = route.params;
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [pengukuran, setPengukuran] = useState<Pengukuran[]>([]);
  const [umur, setUmur] = useState<string>('');

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

  const handleUpdate = () => {
    navigation.navigate('UpdateAnak', { dataAnak: dataAnak });
  };

  // Komponen header yang akan ditampilkan di atas list pengukuran
  const ListHeader = () => (
    <>
      {/* Profil Anak */}
      <View style={styles.profileCard}>
        <Text style={styles.nama}>{dataAnak.nama_balita}</Text>
        <Text style={styles.subText}>Tanggal Lahir: {dataAnak.tgl_lahir}</Text>
        <Text style={styles.subText}>
          Jenis Kelamin: {dataAnak.jenis_kelamin}
        </Text>
        <Text style={styles.subText}>Umur: {umur}</Text>
      </View>
      {/* Info Terakhir */}
      {pengukuran.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Info Terakhir</Text>
          <View style={styles.row}>
            <View style={styles.infoBox}>
              <Text>Umur Saat Diukur</Text>
              <Text style={styles.value}>
                {hitungUmur(
                  dataAnak.tgl_lahir,
                  new Date(pengukuran[0].tanggal_ukur),
                )}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text>Berat</Text>
              <Text style={styles.value}>{pengukuran[0].berat_badan} kg</Text>
            </View>
            <View style={styles.infoBox}>
              <Text>Tinggi</Text>
              <Text style={styles.value}>{pengukuran[0].tinggi_badan} cm</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text>Status Gizi</Text>
            <Text style={styles.value}>{pengukuran[0].status_gizi}</Text>
          </View>
        </>
      )}
      {/* Tombol Update */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Edit Anak</Text>
      </TouchableOpacity>
      {/* Grafik Placeholder */}
      {/* <View style={styles.grafikCard}>
        <Text style={styles.sectionTitle}>Grafik Pertumbuhan</Text>
        <Text style={{ color: '#999' }}>
          Grafik WHO akan ditampilkan di sini.
        </Text>
      </View> */}
      <PertumbuhanChart pengukuran={pengukuran} />
      // Jika kamu ingin tetap menampilkan status gizi di bawah chart, kamu bisa
      tambahkan:
      {pengukuran.length > 0 && (
        <View style={styles.statusGiziContainer}>
          <Text style={styles.sectionTitle}>Status Gizi Terakhir</Text>
          <Text style={styles.statusGiziText}>{pengukuran[0].status_gizi}</Text>
        </View>
      )}
      {/* Judul Histori */}
      <Text style={styles.sectionTitle}>Histori Pengukuran</Text>
    </>
  );

  // Item untuk list pengukuran
  const renderPengukuran = ({ item }: { item: Pengukuran }) => (
    <View style={styles.pengukuranItem}>
      <Text style={styles.pengukuranTanggal}>{item.tanggal_ukur}</Text>
      <Text>Tinggi: {item.tinggi_badan} cm</Text>
      <Text>Berat: {item.berat_badan} kg</Text>
      <Text>Status Gizi: {item.status_gizi}</Text>
      <Text>Posyandu: {item.nama_posyandu}</Text>
      {item.catatan ? <Text>Catatan: {item.catatan}</Text> : null}
    </View>
  );

  // Render item kosong jika tidak ada pengukuran
  const renderEmptyState = () => (
    <Text style={styles.noDataText}>Belum ada data pengukuran.</Text>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6B4EFF" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={ListHeader} // Gunakan komponen header
      data={pengukuran}
      renderItem={renderPengukuran}
      keyExtractor={(item, index) =>
        item.id_gizi?.toString() || `pengukuran-${index}`
      }
      ListEmptyComponent={renderEmptyState} // Tampilkan jika data kosong
      contentContainerStyle={{ paddingBottom: 20 }} // Tambahkan padding bawah
      // Tambahkan jika kamu ingin refresh
      // onRefresh={...}
      // refreshing={...}
    />
  );
}
