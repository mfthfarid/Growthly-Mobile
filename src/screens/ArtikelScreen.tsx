import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
];

export default function ArtikelScreen() {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => (
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

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyArticles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
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
});
