import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles/PengukuranScreenStyles';
import { getMyBalita } from '../service/balitaService'; // Import service
import { Balita } from '../types/types'; // Sesuaikan dengan tipe kamu

export default function PengukuranScreen() {
  const [selectedAnak, setSelectedAnak] = useState('');
  const [dataAnak, setDataAnak] = useState<Balita[]>([]); // State untuk data anak
  const [loading, setLoading] = useState(true); // Tambah loading state
  const [tanggalUkur, setTanggalUkur] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [namaPosyandu, setNamaPosyandu] = useState('');

  // Ambil data anak dari backend
  useEffect(() => {
    const fetchBalita = async () => {
      try {
        const response = await getMyBalita();
        console.log('Response lengkap:', response); // <-- Tambahkan log ini untuk debug

        // Ganti dari:
        // if (Array.isArray(response)) {
        //   setDataAnak(response);
        // }

        // Jadi:
        if (response && Array.isArray(response.balitas)) {
          setDataAnak(response.balitas); // Ambil array dari response.balitas
        } else {
          console.warn('Response.balitas bukan array:', response.balitas);
          setDataAnak([]);
        }
      } catch (error) {
        console.error('Gagal mengambil data anak:', error);
        setDataAnak([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBalita();
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    console.log({
      nama_anak: selectedAnak,
      tanggal_ukur: formatDate(tanggalUkur),
      tinggi_badan: tinggiBadan,
      berat_badan: beratBadan,
      nama_posyandu: namaPosyandu,
    });
    // Nanti bisa panggil API addPengukuran di sini
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTanggalUkur(selectedDate);
    }
  };

  // Tampilkan loading jika data belum siap
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📏 Pengukuran Gizi Anak</Text>

      {/* Nama Anak */}
      <Text style={styles.label}>Nama Anak</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAnak}
          onValueChange={(value: string) => setSelectedAnak(value)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Nama Anak" value="" />
          {dataAnak.map(anak => (
            <Picker.Item
              key={anak.id_balita} // Gunakan id_balita sebagai key
              label={anak.nama_balita} // Gunakan nama_balita sebagai label
              value={anak.nama_balita} // Gunakan nama_balita sebagai value
            />
          ))}
        </Picker>
      </View>

      {/* ... Tanggal Ukur, Tinggi, Berat, Posyandu ... */}
      <Text style={styles.label}>Tanggal Ukur</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(tanggalUkur)}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={tanggalUkur}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Tinggi Badan (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan tinggi badan"
        keyboardType="numeric"
        value={tinggiBadan}
        onChangeText={setTinggiBadan}
      />

      <Text style={styles.label}>Berat Badan (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan berat badan"
        keyboardType="numeric"
        value={beratBadan}
        onChangeText={setBeratBadan}
      />

      <Text style={styles.label}>Nama Posyandu</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama posyandu"
        value={namaPosyandu}
        onChangeText={setNamaPosyandu}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Simpan Data</Text>
      </TouchableOpacity>
    </View>
  );
}
