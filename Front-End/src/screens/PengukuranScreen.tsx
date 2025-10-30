import React, { useState } from 'react';
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

export default function PengukuranScreen() {
  const [selectedAnak, setSelectedAnak] = useState('');
  const [tanggalUkur, setTanggalUkur] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [namaPosyandu, setNamaPosyandu] = useState('');

  // Contoh data anak (bisa nanti diganti dengan API)
  const dataAnak = [
    { id: 1, nama: 'Aisyah' },
    { id: 2, nama: 'Budi' },
    { id: 3, nama: 'Citra' },
  ];

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
    // nanti bisa panggil API di sini
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTanggalUkur(selectedDate);
    }
  };

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
            <Picker.Item key={anak.id} label={anak.nama} value={anak.nama} />
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

      {/* Tombol Simpan */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Simpan Data</Text>
      </TouchableOpacity>
    </View>
  );
}
