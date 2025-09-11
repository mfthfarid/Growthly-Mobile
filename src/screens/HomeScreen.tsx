import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const dummyArticles = [
  {
    id: '1',
    title: 'Tips Sehat di Musim Hujan',
    content:
      'Ini adalah isi lengkap artikel tentang tips sehat di musim hujan...',
    image: 'https://picsum.photos/400/200?random=1',
  },
  {
    id: '2',
    title: 'Belajar React Native Lebih Cepat',
    content:
      'React Native adalah framework cross-platform, yuk pelajari lebih dalam...',
    image: 'https://picsum.photos/400/200?random=2',
  },
  {
    id: '3',
    title: 'Produktivitas Kerja dari Rumah',
    content:
      'Work from home bisa produktif kalau tahu cara mengatur waktu dengan baik...',
    image: 'https://picsum.photos/400/200?random=3',
  },
  {
    id: '4',
    title: 'Produktivitas Kerja dari Rumah',
    content:
      'Work from home bisa produktif kalau tahu cara mengatur waktu dengan baik...',
    image: 'https://picsum.photos/400/200?random=3',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const renderArticle = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailArtikel', { article: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.excerpt}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // bagian header (greeting, banner, menu utama)
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Greeting */}
      <Text style={styles.greeting}>👋 Selamat Datang, John!</Text>

      {/* Banner */}
      <Image
        source={{ uri: 'https://picsum.photos/800/300' }}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Menu Utama</Text>

      {/* Menu Cards */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuCard}>
          <Text style={styles.menuIcon}>📰</Text>
          <Text style={styles.menuText}>Artikel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard}>
          <Text style={styles.menuIcon}>📊</Text>
          <Text style={styles.menuText}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard}>
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuText}>Profil</Text>
        </TouchableOpacity>
      </View>

      {/* Rekomendasi Artikel */}
      <View style={styles.rekomendasiArtikelContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitleArtikel}>Artikel Terbaru</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Artikel')}>
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const limitedArticles = dummyArticles.slice(0, 3);
  return (
    <FlatList
      style={styles.artikel}
      data={limitedArticles}
      keyExtractor={item => item.id}
      renderItem={renderArticle}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: { marginBottom: 20 },
  greeting: { fontSize: 20, fontWeight: '600', marginBottom: 15 },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 25,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuIcon: { fontSize: 28, marginBottom: 8 },
  menuText: { fontSize: 14, fontWeight: '500' },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: 100, height: 100 },
  cardContent: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  excerpt: { fontSize: 13, color: '#666' },
  // headerArtikel: { flex: 1, padding: 16 },
  rekomendasiArtikelContainer: { marginBottom: 0 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  seeAll: { color: 'blue', fontSize: 14, marginBottom: 0 },
  sectionTitleArtikel: { fontSize: 18, fontWeight: 'bold', marginBottom: 0 },
  artikel: {
    marginTop: 0,
  },
});
