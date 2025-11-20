import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // ===== PROFILE CARD =====
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7b2cbf',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileAvatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  nama: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  profileInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
    marginTop: 16,
    width: '100%',
  },
  profileInfo: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  profileInfoLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profileInfoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  }, // Umur Stack Container
  umurStackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  umurTahun: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 18,
  },
  umurBulan: {
    fontSize: 12,
    color: '#999',
    fontWeight: '700',
    lineHeight: 16,
  },

  // ===== SECTION TITLE =====
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 12,
  },

  // ===== INFO TERAKHIR =====
  infoGrid: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7b2cbf',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoBoxLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 6,
  },
  infoBoxValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7b2cbf',
  },

  // ===== BUTTONS =====
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#7b2cbf',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // ===== CHART SECTION =====
  chartContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },

  // ===== HISTORY ITEMS =====
  pengukuranItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7b2cbf',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  pengukuranTanggal: {
    fontSize: 12,
    color: '#7b2cbf',
    fontWeight: '600',
    marginBottom: 8,
  },
  pengukuranRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  pengukuranLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  pengukuranValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statusGiziPengukuran: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statusGiziLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  statusGiziBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#ede0ff',
  },
  statusGiziText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7b2cbf',
  },
  catatanText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 8,
  },

  // Status Gizi Colors
  statusNormal: {
    backgroundColor: '#d4edda',
  },
  statusNormalText: {
    color: '#155724',
  },
  statusStunting: {
    backgroundColor: '#fff3cd',
  },
  statusStuntingText: {
    color: '#856404',
  },
  statusGiziKurang: {
    backgroundColor: '#ffe5cc',
  },
  statusGiziKurangText: {
    color: '#cc5200',
  },
  statusGiziBuruk: {
    backgroundColor: '#f8d7da',
  },
  statusGiziBurukText: {
    color: '#721c24',
  },
  // catatanText: {
  //   fontSize: 12,
  //   color: '#999',
  //   fontStyle: 'italic',
  //   marginTop: 8,
  // },

  // ===== EMPTY STATE =====
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },

  // ===== LOADING =====
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});
