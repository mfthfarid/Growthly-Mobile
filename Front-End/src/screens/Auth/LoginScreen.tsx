// src/screens/Auth/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import styles from '../styles/LoginStyles'; //
import { loginUser } from '../../service/userService';

// Tambahkan tipe untuk UserData agar lebih aman
type UserData = {
  id_user: number;
  username: string;
  nama_orangtua: string;
  no_hp: string;
  alamat: string;
  pendapatan: string; // ENUM: "Rendah", "Sedang", "Tinggi"
  wilayah: string; // ENUM: "Pegunungan", "Dataran Rendah"
  role: string; // "admin", "orangtua"
};

const LoginScreen = ({ onLogin }: any) => {
  // ✅ Tetap menerima onLogin dari App.tsx
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Tambahkan state untuk modal sukses
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Masukkan username dan password terlebih dahulu!');
      setShowError(true);
      return;
    }

    try {
      const result = await loginUser({ username, password });

      if (result.token) {
        // ✅ Simpan token dan user data
        await AsyncStorage.setItem('userToken', result.token);
        await AsyncStorage.setItem('userData', JSON.stringify(result.user));

        setShowSuccess(true);
        setTimeout(() => {
          if (onLogin) onLogin();
          setShowSuccess(false);
        }, 1500);
      } else {
        setErrorMessage(result.message || 'Login gagal.');
        setShowError(true);
      }
    } catch (error: any) {
      console.error('Error login:', error);
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

      <Text style={styles.title}>Selamat Datang</Text>

      <CustomInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

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

      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginBottom: 20 }}
        onPress={() => navigation.navigate('ForgotPassword' as never)}
      >
        <Text style={styles.linkText}>Lupa password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>atau</Text>
        <View style={styles.separator} />
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text>Belum punya akun? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register' as never)}
        >
          <Text style={{ color: '#8e7dff', fontWeight: 'bold' }}>Daftar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Error */}
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

      {/* Modal Sukses */}
      <Modal transparent visible={showSuccess} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.successCircle}>
              <Text style={styles.successCheck}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Berhasil!</Text>
            <Text style={styles.modalMessage}>
              Login berhasil, selamat datang kembali!
            </Text>
            {/* Tidak perlu tombol tutup karena otomatis navigasi */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
