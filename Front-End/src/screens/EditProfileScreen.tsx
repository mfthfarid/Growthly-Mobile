import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import { styles } from './styles/EditProfileScreenStyles';
import { updateProfile, updatePassword } from '../service/userService';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // Password fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Show/Hide password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal states
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setNama(parsedUser.nama_orangtua || '');
        setNoHp(parsedUser.no_hp || '');
        setAlamat(parsedUser.alamat || '');
      }
    };
    loadUserData();
  }, []);

  const getAvatarInitial = () => {
    return user?.nama_orangtua
      ? user.nama_orangtua.charAt(0).toUpperCase()
      : '?';
  };

  const handleSaveProfile = async () => {
    if (!nama || !noHp || !alamat) {
      setErrorMessage('Harap isi semua field profil');
      setShowError(true);
      return;
    }

    try {
      await updateProfile(user.id_user, {
        nama_orangtua: nama,
        no_hp: noHp,
        alamat: alamat,
      });

      const updatedUser = {
        ...user,
        nama_orangtua: nama,
        no_hp: noHp,
        alamat: alamat,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));

      // Tampilkan modal sukses
      setSuccessMessage('Profil kamu telah diperbarui!');
      setShowSuccess(true);

      // Setelah 1.5 detik, kembali ke layar sebelumnya
      setTimeout(() => {
        setShowSuccess(false);
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error('Error update profile:', error);
      setErrorMessage('Terjadi kesalahan saat update profil');
      setShowError(true);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Harap isi semua field password!');
      setShowError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok!');
      setShowError(true);
      return;
    }

    try {
      await updatePassword(user.id_user, {
        oldPassword,
        newPassword,
      });

      setSuccessMessage('Password berhasil diubah 🎉');
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        // Opsional: kamu bisa kembali ke layar profil atau tetap di sini
        // Jika ingin konsisten seperti profil, tambahkan:
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error('Error update password:', error);
      setErrorMessage('Password lama salah atau server error.');
      setShowError(true);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
        style={styles.avatar}
      /> */}
      <View style={styles.headerSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getAvatarInitial()}</Text>
        </View>
      </View>

      {/* FORM PROFIL */}
      <CustomInput
        style={styles.input}
        placeholder="Nama Orang Tua"
        value={nama}
        onChangeText={setNama}
      />
      <CustomInput
        style={styles.input}
        placeholder="Nomor HP"
        value={noHp}
        onChangeText={setNoHp}
      />
      <CustomInput
        style={styles.input}
        placeholder="Alamat"
        value={alamat}
        onChangeText={setAlamat}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>💾 Simpan Profil</Text>
      </TouchableOpacity>

      {/* FORM UBAH PASSWORD */}
      <Text style={[styles.title, { marginTop: 25 }]}>Ubah Password</Text>

      {/* Password Lama */}
      <View style={styles.passwordContainer}>
        <CustomInput
          style={styles.passwordInput}
          placeholder="Password Lama"
          secureTextEntry={!showOldPassword}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TouchableOpacity
          onPress={() => setShowOldPassword(!showOldPassword)}
          style={styles.toggleBtn}
        >
          <Text>{showOldPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {/* Password Baru */}
      <View style={styles.passwordContainer}>
        <CustomInput
          style={styles.passwordInput}
          placeholder="Password Baru"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
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
          placeholder="Konfirmasi Password Baru"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.toggleBtn}
        >
          <Text>{showConfirmPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleChangePassword}
      >
        <Text style={styles.saveButtonText}>🔑 Ubah Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Batal</Text>
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
            <Text style={styles.modalMessage}>{successMessage}</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
