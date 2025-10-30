import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/ArtikelScreenStyles';

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
    title: 'Hidup Sehat dengan Pola Tidur Teratur',
    content:
      'Kualitas tidur sangat berpengaruh pada imunitas tubuh dan konsentrasi...',
    image: 'https://picsum.photos/400/200?random=4',
  },
  {
    id: '5',
    title: 'Manfaat Jalan Kaki di Pagi Hari',
    content:
      'Selain menyehatkan jantung, jalan pagi juga membantu memperbaiki mood...',
    image: 'https://picsum.photos/400/200?random=5',
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
      <Text style={styles.header}>📰 Daftar Artikel</Text>
      <FlatList
        data={dummyArticles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
