import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f8f9fa' },
  greeting: { fontSize: 20, fontWeight: '600', marginBottom: 15 },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 25,
  },

  // Menu utama
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  menuCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  menuIcon: { fontSize: 28, marginBottom: 6 },
  menuText: { fontSize: 14, fontWeight: '500' },

  // Artikel
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleArtikel: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#007BFF', fontSize: 14 },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    marginBottom: 12,
  },
  articleImage: { width: 100, height: 100 },
  articleContent: { flex: 1, padding: 10, justifyContent: 'center' },
  articleTitle: { fontSize: 16, fontWeight: 'bold' },
  articleExcerpt: { fontSize: 13, color: '#666' },

  // Makanan grid
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  foodWrapper: {
    width: (width - 48) / 2,
    marginBottom: 15,
  },
  foodCard: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
    elevation: 3,
  },
  foodImage: {
    width: '100%',
    height: 140,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 6,
    alignItems: 'center',
  },
  foodTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default styles;
