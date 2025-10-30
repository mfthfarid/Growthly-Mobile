// src/screens/PrediksiScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  predictNutritionStatus,
  PredictionResponse,
} from '../service/mlService';

type Gender = 'Laki-laki' | 'Perempuan';

type PredictionResult = {
  prediction: number;
  title: string;
  description: string;
  color: string;
  icon: string;
};

export default function PrediksiScreen() {
  const [namaAnak, setNamaAnak] = useState<string>('');
  const [umur, setUmur] = useState<string>('');
  const [tinggiBadan, setTinggiBadan] = useState<string>('');
  const [jenisKelamin, setJenisKelamin] = useState<Gender>('Laki-laki');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

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

  const handlePredict = async () => {
    if (!namaAnak.trim()) {
      Alert.alert('Peringatan', 'Nama anak wajib diisi!');
      return;
    }
    if (!umur.trim() || !tinggiBadan.trim()) {
      Alert.alert('Peringatan', 'Harap isi semua data!');
      return;
    }

    const umurNum = parseFloat(umur);
    const tbNum = parseFloat(tinggiBadan);

    if (isNaN(umurNum) || isNaN(tbNum)) {
      Alert.alert('Peringatan', 'Masukkan angka yang valid!');
      return;
    }

    if (umurNum < 0 || umurNum > 72) {
      Alert.alert('Peringatan', 'Umur harus antara 0–72 bulan.');
      return;
    }

    setLoading(true);
    try {
      const response = await predictNutritionStatus({
        umur: umurNum,
        jenis_kelamin: jenisKelamin,
        tinggi_badan: tbNum,
      });

      const resultData = getPredictionResult(response.prediction);
      setResult(resultData);
    } catch (error) {
      Alert.alert(
        'Error',
        (error as Error).message || 'Gagal melakukan prediksi',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🤖 Prediksi Status Gizi</Text>
        <Text style={styles.desc}>
          Masukkan data anak untuk memprediksi status gizi.
        </Text>

        {/* Nama Anak */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nama Anak</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Budi"
            value={namaAnak}
            onChangeText={setNamaAnak}
          />
        </View>

        {/* Umur */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Umur (bulan)</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: 24"
            keyboardType="numeric"
            value={umur}
            onChangeText={setUmur}
          />
        </View>

        {/* Tinggi Badan */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tinggi Badan (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: 85"
            keyboardType="numeric"
            value={tinggiBadan}
            onChangeText={setTinggiBadan}
          />
        </View>

        {/* Jenis Kelamin */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Jenis Kelamin</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[
                styles.radio,
                jenisKelamin === 'Laki-laki' && styles.radioSelected,
              ]}
              onPress={() => setJenisKelamin('Laki-laki')}
            >
              <Text style={styles.radioText}>Laki-laki</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radio,
                jenisKelamin === 'Perempuan' && styles.radioSelected,
              ]}
              onPress={() => setJenisKelamin('Perempuan')}
            >
              <Text style={styles.radioText}>Perempuan</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handlePredict}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Memproses...' : 'Mulai Prediksi'}
          </Text>
        </TouchableOpacity>

        {result && (
          <View style={[styles.resultBox, { borderColor: result.color }]}>
            <Text style={styles.resultIcon}>{result.icon}</Text>
            <Text style={[styles.resultTitle, { color: result.color }]}>
              {result.title}
            </Text>
            <Text style={styles.resultDescription}>{result.description}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  desc: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#7f8c8d',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8,
  },
  radio: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  radioSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  radioText: {
    color: '#333',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2c3e50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultBox: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultDescription: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
  },
});
