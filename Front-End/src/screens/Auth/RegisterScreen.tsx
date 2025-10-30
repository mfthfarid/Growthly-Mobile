import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from '../../components/CustomInput';
import styles from '../styles/RegisterStyles';
import { registerUser } from '../../service/userService';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [namaOrangtua, setNamaOrangtua] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [pendapatan, setPendapatan] = useState<string>('');
  const [wilayah, setWilayah] = useState<'dataran_rendah' | 'pegunungan'>(
    'dataran_rendah',
  );
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Modal state
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi tidak sama!');
      setShowError(true);
      return;
    }

    const pendapatanNum = parseFloat(pendapatan);
    if (isNaN(pendapatanNum)) {
      setErrorMessage('Pendapatan harus berupa angka.');
      setShowError(true);
      return;
    }

    const registerData = {
      username: name,
      password,
      nama_orangtua: namaOrangtua,
      no_hp: noHp,
      alamat,
      pendapatan: pendapatanNum,
      wilayah,
    };

    try {
      const result = await registerUser(registerData);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigation.navigate('Login');
      }, 1500);
    } catch (error: any) {
      console.error('Error register:', error);
      setErrorMessage(error.message || 'Tidak dapat terhubung ke server.');
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo1.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Buat Akun Baru</Text>

      <CustomInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />
      <CustomInput
        style={styles.input}
        placeholder="Nama Lengkap"
        value={namaOrangtua}
        onChangeText={setNamaOrangtua}
      />
      <CustomInput
        style={styles.input}
        placeholder="Nomor HP"
        value={noHp}
        onChangeText={setNoHp}
        keyboardType="phone-pad"
      />
      <CustomInput
        style={styles.input}
        placeholder="Alamat"
        value={alamat}
        onChangeText={setAlamat}
      />
      <CustomInput
        style={styles.input}
        placeholder="Pendapatan (angka, misal: 2000000)"
        value={pendapatan}
        onChangeText={setPendapatan}
        keyboardType="numeric"
      />

      {/* Wilayah */}
      <View style={styles.input}>
        <Text style={{ color: '#000' }}>Wilayah:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setWilayah('dataran_rendah')}
            style={[
              styles.radioBtn,
              wilayah === 'dataran_rendah' && styles.selectedRadio,
            ]}
          >
            <Text>Dataran Rendah</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setWilayah('pegunungan')}
            style={[
              styles.radioBtn,
              wilayah === 'pegunungan' && styles.selectedRadio,
            ]}
          >
            <Text>Pegunungan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tanggal Lahir */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: dob ? '#000' : '#888' }}>
          {dob ? dob.toLocaleDateString() : 'Tanggal Lahir'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

      {/* Password */}
      <View style={styles.passwordContainer}>
        <CustomInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.toggleBtn}
        >
          <Text>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <CustomInput
          style={styles.passwordInput}
          placeholder="Konfirmasi Password"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.toggleBtn}
        >
          <Text>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>Daftar</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text>Sudah punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.linkText, { fontWeight: 'bold' }]}>Login</Text>
        </TouchableOpacity>
      </View>

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
            <Text style={styles.modalMessage}>Akun berhasil dibuat 🎉</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegisterScreen;
