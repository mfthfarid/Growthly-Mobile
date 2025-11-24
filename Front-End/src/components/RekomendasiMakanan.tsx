// components/RekomendasiMakanan.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FoodRecommendationItem } from '../types/types';

interface RekomendasiMakananProps {
  visible: boolean;
  loading: boolean;
  rekomendasi: FoodRecommendationItem[]; // Harus array, bukan null
  onClose: () => void;
  onRefresh?: () => void; // ✅ Tambahkan ini
}

const RekomendasiMakanan: React.FC<RekomendasiMakananProps> = ({
  visible,
  loading,
  rekomendasi,
  onClose,
  onRefresh, // ✅ Gunakan prop ini
}) => {
  if (loading) {
    return (
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#27ae60" />
            <Text style={styles.loadingText}>Memuat rekomendasi...</Text>
          </View>
        </View>
      </Modal>
    );
  }

  const renderFoodItem = ({ item }: { item: FoodRecommendationItem }) => (
    <View style={styles.card}>
      <Text style={styles.namaPangan}>{item['Nama Pangan']}</Text>
      <Text style={styles.kategori}>Kategori: {item.Kategori}</Text>
      <Text style={styles.gizi}>Gizi: {item['Kandungan Gizi Utama']}</Text>
      <Text style={styles.manfaat}>
        Manfaat: {item['Manfaat untuk Anak Stunting']}
      </Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Rekomendasi Makanan</Text>

          {rekomendasi.length > 0 ? (
            <FlatList
              data={rekomendasi}
              renderItem={renderFoodItem}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noData}>Tidak ada rekomendasi.</Text>
          )}

          {/* Tombol Tutup dan Ulangi dalam satu baris */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={20} color="white" />
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>

            {onRefresh && ( // ✅ Render hanya jika onRefresh diberikan
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={onRefresh}
              >
                <Icon name="refresh" size={20} color="white" />
                <Text style={styles.refreshButtonText}>Ulangi</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2c3e50',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  namaPangan: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  kategori: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  gizi: {
    fontSize: 14,
    color: '#3498db',
    marginTop: 4,
  },
  manfaat: {
    fontSize: 14,
    color: '#27ae60',
    marginTop: 4,
    fontStyle: 'italic',
  },
  noData: {
    textAlign: 'center',
    color: '#95a5a6',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#f39c12',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RekomendasiMakanan;
