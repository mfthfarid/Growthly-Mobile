import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import CustomInput from '../../components/CustomInput';
import styles from '../styles/ForgotPasswordStyles';
import { forgotPassword } from '../../service/userService';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // ✅ Modal state sama seperti LoginScreen
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleForgotPassword = async () => {
    if (!username) {
      setErrorMessage('Harap masukkan username!');
      setShowError(true);
      return;
    }
    if (!newPassword) {
      setErrorMessage('Harap masukkan password baru!');
      setShowError(true);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Password baru dan konfirmasi tidak cocok!');
      setShowError(true);
      return;
    }

    try {
      const result = await forgotPassword({ username, newPassword });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigation.goBack();
      }, 1500);
    } catch (error: any) {
      console.error('Error forgot password:', error);
      setErrorMessage(error.message || 'Tidak dapat terhubung ke server.');
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lupa Password</Text>

      <CustomInput
        style={styles.input}
        placeholder="Masukkan username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Baru */}
      <View style={styles.passwordContainer}>
        <CustomInput
          style={styles.passwordInput}
          placeholder="Password baru"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowNewPassword(!showNewPassword)}
          style={styles.toggleBtn}
        >
          <Text>{showNewPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {/* Konfirmasi Password Baru */}
      <View style={styles.passwordContainer}>
        <CustomInput
          style={styles.passwordInput}
          placeholder="Konfirmasi password baru"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry={!showConfirmNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
          style={styles.toggleBtn}
        >
          <Text>{showConfirmNewPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
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
              Password berhasil direset 🎉
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ForgotPasswordScreen;
