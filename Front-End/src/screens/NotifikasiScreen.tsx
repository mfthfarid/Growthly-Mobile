import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotifikasiScreen() {
  const [showModal, setShowModal] = useState(false);
  const [notifShown, setNotifShown] = useState(false);

  useEffect(() => {
    checkNotification();
  }, []);

  // Mengecek apakah notifikasi bulan ini sudah ditampilkan
  const checkNotification = async () => {
    const lastNotif = await AsyncStorage.getItem('lastNotifMonth');
    const currentMonth = new Date().getMonth(); // 0 = Januari

    // Jika belum pernah tampil bulan ini → tampilkan
    if (lastNotif !== String(currentMonth)) {
      setShowModal(true);
      await AsyncStorage.setItem('lastNotifMonth', String(currentMonth));
      setNotifShown(true);
    }
  };

  // Reset untuk testing supaya notifikasi muncul lagi
  const resetNotification = async () => {
    await AsyncStorage.removeItem('lastNotifMonth');
    setNotifShown(false);
    setShowModal(false);
    Alert.alert(
      '✅ Notifikasi direset — akan muncul lagi saat halaman dibuka.',
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Halaman Utama</Text>

      <TouchableOpacity style={styles.button} onPress={checkNotification}>
        <Text style={styles.buttonText}>Cek Notifikasi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#f87171' }]}
        onPress={resetNotification}
      >
        <Text style={styles.buttonText}>Reset Notifikasi (Testing)</Text>
      </TouchableOpacity>

      {notifShown && (
        <Text style={styles.infoText}>
          ✅ Notifikasi bulan ini sudah tampil
        </Text>
      )}

      {/* Modal Notifikasi */}
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>📅 Pengingat Bulanan</Text>
            <Text style={styles.modalMessage}>
              Jangan lupa ke posyandu terdekat bulan ini! 🏥
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// 🎨 STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  infoText: {
    marginTop: 10,
    color: '#10b981',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
