import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles/PengukuranScreenStyles';
import { getMyBalita } from '../service/balitaService';
import { Balita } from '../types/types';
import { addPengukuran } from '../service/pengukuranService';
import {
  predictNutritionStatus,
  PredictionResponse,
} from '../service/mlService';

type PredictionResult = {
  prediction: number;
  title: string;
  description: string;
  color: string;
  icon: string;
};

export default function PengukuranScreen() {
  const [selectedAnak, setSelectedAnak] = useState('');
  const [dataAnak, setDataAnak] = useState<Balita[]>([]);
  const [loading, setLoading] = useState(true);
  const [tanggalUkur, setTanggalUkur] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [namaPosyandu, setNamaPosyandu] = useState('');
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // Modal
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBalita = async () => {
      try {
        const response = await getMyBalita();
        if (response && Array.isArray(response.balitas)) {
          setDataAnak(response.balitas);
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

  const getPredictionResult = (prediction: number): PredictionResult => {
    switch (prediction) {
      case 0: // Normal
        return {
          prediction,
          title: 'Normal',
          description:
            'Selamat! Status gizi anak Anda tergolong dalam kategori normal. Pertahankan pola makan dan gaya hidup sehat.',
          color: '#27ae60',
          icon: '🟢',
        };
      case 1: // Severely Stunted
        return {
          prediction,
          title: 'Severely Stunted',
          description:
            'Status gizi anak Anda tergolong dalam kategori sangat pendek (severely stunted). Segera konsultasikan dengan ahli gizi atau dokter anak.',
          color: '#e74c3c',
          icon: '🔴',
        };
      case 2: // Stunted
        return {
          prediction,
          title: 'Stunted',
          description:
            'Status gizi anak Anda tergolong dalam kategori pendek (stunted). Disarankan untuk berkonsultasi dengan ahli gizi untuk perbaikan nutrisi.',
          color: '#f39c12',
          icon: '🟠',
        };
      case 3: // Tinggi
        return {
          prediction,
          title: 'Tinggi',
          description:
            'Status gizi anak Anda tergolong dalam kategori tinggi. Ini adalah indikator yang baik, terus pantau pertumbuhannya.',
          color: '#3498db',
          icon: '🔵',
        };
      default:
        return {
          prediction,
          title: 'Tidak Diketahui',
          description: `Nilai prediksi tidak dikenali: ${prediction}`,
          color: '#95a5a6',
          icon: '❓',
        };
    }
  };

  // Di atas komponen, atau di file terpisah seperti utils.ts
  const mapStatusGiziToDatabase = (title: string): string => {
    switch (title) {
      case 'Normal':
        return 'Normal';
      case 'Severely Stunted':
        return 'Gizi Buruk'; // Atau sesuaikan
      case 'Stunted':
        return 'Gizi Kurang'; // Atau sesuaikan
      case 'Tinggi':
        return 'Normal'; // Atau buat status baru di database jika perlu
      default:
        return 'Normal'; // Fallback
    }
  };

  // Fungsi untuk menghitung umur dalam bulan dari tgl_lahir dan tanggalUkur
  const hitungUmur = (tglLahir: string, tglUkur: Date): number => {
    const lahir = new Date(tglLahir);
    const ukur = tglUkur;
    let umurBulan = (ukur.getFullYear() - lahir.getFullYear()) * 12;
    umurBulan += ukur.getMonth() - lahir.getMonth();
    if (ukur.getDate() < lahir.getDate()) {
      umurBulan--;
    }
    return Math.max(0, umurBulan);
  };

  // Fungsi untuk melakukan prediksi
  const handlePredict = async () => {
    if (!selectedAnak) {
      Alert.alert('Peringatan', 'Pilih anak terlebih dahulu.');
      return;
    }
    if (!tinggiBadan || !beratBadan) {
      Alert.alert(
        'Peringatan',
        'Masukkan tinggi dan berat badan terlebih dahulu.',
      );
      return;
    }

    const selectedAnakData = dataAnak.find(a => a.nama_balita === selectedAnak);
    if (!selectedAnakData) {
      Alert.alert('Error', 'Anak tidak ditemukan.');
      return;
    }

    const umur = hitungUmur(selectedAnakData.tgl_lahir, tanggalUkur);
    const jenisKelamin =
      selectedAnakData.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan';

    const tinggiNum = parseFloat(tinggiBadan);
    const beratNum = parseFloat(beratBadan);

    if (isNaN(tinggiNum) || isNaN(beratNum)) {
      Alert.alert(
        'Peringatan',
        'Masukkan angka yang valid untuk tinggi dan berat badan.',
      );
      return;
    }

    setPredicting(true);
    try {
      const response = await predictNutritionStatus({
        umur,
        jenis_kelamin: jenisKelamin,
        tinggi_badan: tinggiNum,
      });

      const resultData = getPredictionResult(response.prediction);
      setResult(resultData); // ✅ Simpan hasil ke `result`
    } catch (error) {
      Alert.alert(
        'Error',
        (error as Error).message || 'Gagal melakukan prediksi',
      );
    } finally {
      setPredicting(false);
    }
  };

  const showErrorModal = (message: string) => {
    setErrorMessage(message);
    setShowError(true);

    // Sembunyikan modal setelah 3 detik
    setTimeout(() => {
      setShowError(false);
    }, 3000); // 3 detik
  };

  const handleSubmit = async () => {
    if (!result) {
      Alert.alert(
        'Peringatan',
        'Lakukan prediksi terlebih dahulu untuk mendapatkan status gizi.',
      );
      return;
    }

    if (!selectedAnak) {
      Alert.alert('Peringatan', 'Pilih anak terlebih dahulu.');
      return;
    }

    if (!tinggiBadan || !beratBadan) {
      Alert.alert(
        'Peringatan',
        'Masukkan tinggi dan berat badan terlebih dahulu.',
      );
      return;
    }

    const selectedAnakData = dataAnak.find(a => a.nama_balita === selectedAnak);
    if (!selectedAnakData) {
      Alert.alert('Error', 'Anak tidak ditemukan.');
      return;
    }

    const tinggiNum = parseFloat(tinggiBadan);
    const beratNum = parseFloat(beratBadan);

    if (isNaN(tinggiNum) || isNaN(beratNum)) {
      Alert.alert(
        'Peringatan',
        'Masukkan angka yang valid untuk tinggi dan berat badan.',
      );
      return;
    }

    setLoading(true); // Gunakan loading state utama atau buat state baru seperti isSubmitting
    try {
      const payload = {
        id_balita: selectedAnakData.id_balita.toString(),
        tanggal_ukur: formatDate(tanggalUkur),
        tinggi_badan: tinggiNum,
        berat_badan: beratNum,
        status_gizi: mapStatusGiziToDatabase(result.title), // ✅ Gunakan mapping
        catatan: '', // Tambahkan jika kamu punya input catatan
        nama_posyandu: namaPosyandu,
      };

      const response = await addPengukuran(payload);
      console.log('Response dari API:', response);

      setSuccessMessage(response.message);
      setShowSuccess(true);
      // ✅ Sembunyikan modal setelah 3 detik
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // 3 detik

      // Reset form jika perlu
      setTinggiBadan('');
      setBeratBadan('');
      setNamaPosyandu('');
      setResult(null);
    } catch (error: any) {
      // Alert.alert('Gagal', error.message);
      showErrorModal(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTanggalUkur(selectedDate);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>📏 Pengukuran Gizi Anak</Text>

          {/* Nama Anak */}
          <Text style={styles.label}>Nama Anak</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedAnak}
              onValueChange={(value: string) => setSelectedAnak(value)}
              style={styles.picker}
              itemStyle={{ color: '#333' }}
            >
              <Picker.Item label="Pilih Nama Anak" value="" />
              {dataAnak.map(anak => (
                <Picker.Item
                  key={anak.id_balita}
                  label={anak.nama_balita}
                  value={anak.nama_balita}
                />
              ))}
            </Picker>
          </View>

          {/* Tanggal Ukur */}
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

          {/* Tinggi Badan */}
          <Text style={styles.label}>Tinggi Badan (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan tinggi badan"
            keyboardType="numeric"
            value={tinggiBadan}
            onChangeText={setTinggiBadan}
          />

          {/* Berat Badan */}
          <Text style={styles.label}>Berat Badan (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan berat badan"
            keyboardType="numeric"
            value={beratBadan}
            onChangeText={setBeratBadan}
          />

          {/* Nama Posyandu */}
          <Text style={styles.label}>Nama Posyandu</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nama posyandu"
            value={namaPosyandu}
            onChangeText={setNamaPosyandu}
          />

          {/* Tombol Prediksi */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handlePredict}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Memproses...' : 'Prediksi Status Gizi'}
            </Text>
          </TouchableOpacity>

          {/* Hasil Prediksi */}
          {result && (
            <View style={[styles.resultBox, { borderColor: result.color }]}>
              <Text style={styles.resultIcon}>{result.icon}</Text>
              <Text style={[styles.resultTitle, { color: result.color }]}>
                {result.title}
              </Text>
              <Text style={styles.resultDescription}>{result.description}</Text>
            </View>
          )}

          {/* Tombol Simpan */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Simpan Data</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Success */}
        {showSuccess && (
          <Modal transparent visible={showSuccess} animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <View style={styles.successCircle}>
                  <Text style={styles.successCheck}>✓</Text>
                </View>
                <Text style={styles.modalTitle}>Berhasil!</Text>
                <Text style={styles.modalMessage}>{successMessage} 🎉</Text>
                {/* <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowSuccess(false)}
                >
                  <Text style={styles.buttonText}>Tutup</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
        )}

        {/* Modal Eror */}
        {showError && (
          <Modal transparent visible={showError} animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <View style={styles.errorCircle}>
                  <Text style={styles.errorX}>✕</Text>
                </View>
                <Text style={styles.modalTitle}>Gagal!</Text>
                <Text style={styles.modalMessage}>{errorMessage}</Text>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
