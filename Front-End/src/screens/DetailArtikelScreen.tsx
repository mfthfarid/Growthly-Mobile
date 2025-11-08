import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { IMAGE_BASE_URL } from '../service/apiService'; // <-- Tambahkan import
import { styles } from './styles/DetailArtikelScreenStyles';

type DetailArtikelScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailArtikel'
>;

export default function DetailArtikelScreen({
  route,
}: DetailArtikelScreenProps) {
  const { article } = route.params;

  // Bangun URL gambar jika ada foto
  const imageUrl = article.foto
    ? `${IMAGE_BASE_URL}/${article.foto}` // Gabung base URL + nama file
    : null;

  return (
    <ScrollView style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <Text style={styles.title}>{article.judul}</Text>
      <Text style={styles.content}>{article.isi}</Text>
    </ScrollView>
  );
}
