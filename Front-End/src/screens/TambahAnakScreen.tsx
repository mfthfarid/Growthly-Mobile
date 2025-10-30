import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/TambahAnakScreenStyles';
import { addBalita } from '../service/balitaService';

interface UserData {
  id_user: number;
  nama_orangtua: string;
  username: string;
}

export default function TambahAnakScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  const [namaAnak, setNamaAnak] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [jenisKelamin, setJenisKelamin] = useState<'L' | 'P' | ''>('');
  const [loading, setLoading] = useState(false);

  // Modal states
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedUser) {
          setUser(JSON.parse(storedUser) as UserData);
        }
      } catch (error) {
        console.error('Gagal memuat data user:', error);
        setErrorMessage('Gagal memuat data orang tua');
        setShowError(true);
      }
    };
    loadUserData();
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTanggalLahir(selectedDate);
    }
  };

  const handleSimpan = async () => {
    if (!namaAnak.trim()) {
      setErrorMessage('Nama anak wajib diisi!');
      setShowError(true);
      return;
    }
    if (!jenisKelamin) {
      setErrorMessage('Jenis kelamin wajib dipilih!');
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      const newData = {
        nama_balita: namaAnak,
        tgl_lahir: formatDate(tanggalLahir),
        jenis_kelamin: jenisKelamin,
      };

      // Kirim ke API
      const response = await addBalita(newData);

      // Kalau backend kirim id, pakai itu. Kalau tidak, fallback pakai timestamp
      const addedBalita = {
        id_balita: response?.id_balita || Date.now(),
        ...newData,
      };

      // Tampilkan notifikasi berhasil
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        // Kirim data anak baru ke halaman Anak
        navigation.navigate('MenuAnakScreen', { newBalita: addedBalita });
      }, 1500);
    } catch (error: any) {
      console.error('Error tambah balita:', error);
      setErrorMessage(error.message || 'Terjadi kesalahan saat menyimpan data');
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleJenisKelamin = (jenis: 'L' | 'P') => {
    setJenisKelamin(jenis);
  };

  return (
    <View style={styles.container}>
      {/* Nama Orang Tua */}
      <Text style={styles.label}>Nama Orang Tua</Text>
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        value={user?.nama_orangtua || 'Memuat...'}
        editable={false}
        selectTextOnFocus={false}
      />

      {/* Nama Anak */}
      <Text style={styles.label}>Nama Anak</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama anak"
        value={namaAnak}
        onChangeText={setNamaAnak}
      />

      {/* Tanggal Lahir */}
      <Text style={styles.label}>Tanggal Lahir</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(tanggalLahir)}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={tanggalLahir}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* Jenis Kelamin */}
      <Text style={styles.label}>Jenis Kelamin</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            jenisKelamin === 'L' && styles.genderButtonActive,
          ]}
          onPress={() => toggleJenisKelamin('L')}
        >
          <Text
            style={[
              styles.genderButtonText,
              jenisKelamin === 'L' && styles.genderButtonTextActive,
            ]}
          >
            Laki-laki
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            jenisKelamin === 'P' && styles.genderButtonActive,
          ]}
          onPress={() => toggleJenisKelamin('P')}
        >
          <Text
            style={[
              styles.genderButtonText,
              jenisKelamin === 'P' && styles.genderButtonTextActive,
            ]}
          >
            Perempuan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tombol Simpan */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSimpan}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Simpan</Text>
        )}
      </TouchableOpacity>

      {/* 🔴 Modal Error */}
      <Modal
        transparent
        visible={showError}
        animationType="fade"
        onRequestClose={() => setShowError(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.errorCircle}>
              <Text style={styles.errorX}>✕</Text>
            </View>
            <Text style={styles.modalTitle}>Terjadi Kesalahan!</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowError(false)}
            >
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🟢 Modal Sukses */}
      <Modal transparent visible={showSuccess} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.successCircle}>
              <Text style={styles.successCheck}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Berhasil!</Text>
            <Text style={styles.modalMessage}>
              Anak {namaAnak} berhasil ditambahkan! 🎉
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
