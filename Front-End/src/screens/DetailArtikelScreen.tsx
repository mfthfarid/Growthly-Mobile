import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { styles } from './styles/DetailArtikelScreenStyles';

// Type untuk artikel di detail screen, sesuaikan dengan struktur data dari backend
// interface Artikel {
//   id_artikel: number; // Atau string
//   title: string;
//   content: string;
//   image?: string; // Opsional jika bisa null/undefined
//   // tambahkan field lain jika ada
// }

// Definisikan tipe properti
type DetailArtikelScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailArtikel'
>;

// type DetailArtikelScreenProps = {
//   route: {
//     params: {
//       article: Artikel;
//     };
//   };
// };

export default function DetailArtikelScreen({
  route,
}: DetailArtikelScreenProps) {
  const { article } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Gunakan field gambar dari backend */}
      {article.foto ? (
        <Image source={{ uri: article.foto }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} /> // Tambahkan style placeholder jika perlu
      )}
      <Text style={styles.title}>{article.judul}</Text>
      {/* Menampilkan isi lengkap artikel */}
      <Text style={styles.content}>{article.isi}</Text>
    </ScrollView>
  );
}
