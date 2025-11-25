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
  rekomendasi: FoodRecommendationItem[];
  onClose: () => void;
  onRefresh?: () => void;
}

const RekomendasiMakanan: React.FC<RekomendasiMakananProps> = ({
  visible,
  loading,
  rekomendasi,
  onClose,
  onRefresh,
}) => {
  const renderLoadingState = () => (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#27ae60" />
          <Text style={styles.loadingText}>Memuat rekomendasi...</Text>
        </View>
      </View>
    </Modal>
  );

  const FoodCard = ({ item }: { item: FoodRecommendationItem }) => (
    <View style={styles.foodCard}>
      <Text style={styles.foodName}>{item['Nama Pangan']}</Text>

      <View style={styles.foodInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Kategori:</Text>
          <Text style={styles.infoValue}>{item.Kategori}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gizi:</Text>
          <Text style={styles.infoValue}>{item['Kandungan Gizi Utama']}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Manfaat:</Text>
          <Text style={styles.infoValue}>
            {item['Manfaat untuk Anak Stunting']}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="restaurant" size={48} color="#bdc3c7" />
      <Text style={styles.emptyText}>Tidak ada rekomendasi tersedia</Text>
    </View>
  );

  if (loading) {
    return renderLoadingState();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🥗 Rekomendasi Makanan</Text>
          </View>

          {/* CONTENT */}
          {rekomendasi.length > 0 ? (
            <FlatList
              data={rekomendasi}
              renderItem={FoodCard}
              keyExtractor={(_, index) => `food-${index}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            renderEmptyState()
          )}

          {/* BUTTONS */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Icon name="close" size={18} color="#fff" />
              <Text style={styles.buttonText}>Tutup</Text>
            </TouchableOpacity>

            {onRefresh && (
              <TouchableOpacity
                style={[styles.button, styles.refreshButton]}
                onPress={onRefresh}
              >
                <Icon name="refresh" size={18} color="#fff" />
                <Text style={styles.buttonText}>Ulangi</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  loadingContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },

  // ===== MODAL CONTENT =====
  modalContent: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },

  listContent: {
    padding: 16,
    gap: 12,
  },

  // ===== FOOD CARD =====
  foodCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  foodName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },

  foodInfo: {
    gap: 8,
  },

  infoRow: {
    flexDirection: 'row',
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    width: '30%',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  infoValue: {
    fontSize: 13,
    color: '#2c3e50',
    flex: 1,
    fontWeight: '500',
  },

  // ===== EMPTY STATE =====
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },

  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#95a5a6',
    fontWeight: '500',
  },

  // ===== BUTTONS =====
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    elevation: 2,
  },

  closeButton: {
    backgroundColor: '#e74c3c',
  },

  refreshButton: {
    backgroundColor: '#27ae60',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});

export default RekomendasiMakanan;
