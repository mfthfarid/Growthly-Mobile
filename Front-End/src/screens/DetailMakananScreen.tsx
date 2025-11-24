import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './styles/DetailMakananScreenStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { IMAGE_BASE_URL } from '../service/apiService';

type DetailMakananScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailMakanan'
>;

export default function DetailMakananScreen({
  route,
}: DetailMakananScreenProps) {
  console.log(route.params);
  const { food } = route.params;

  // Validasi jika food tidak ada atau bukan objek
  if (!food || typeof food !== 'object') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Data makanan tidak ditemukan.</Text>
      </View>
    );
  }

  const imageUrl = food.foto
    ? `${IMAGE_BASE_URL}/makanan/${food.foto}` // Gabung base URL + nama file
    : null;

  return (
    <ScrollView style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      <Text style={styles.title}>{food.nama_makanan}</Text>
      <Text style={styles.content}>{food.isi}</Text>

      <Text style={styles.subtitle}>🍽️ Kandungan Gizi:</Text>
      <Text style={styles.text}>• Karbohidrat: 40g</Text>
      <Text style={styles.text}>• Protein: 15g</Text>
      <Text style={styles.text}>• Lemak: 5g</Text>
      <Text style={styles.text}>• Vitamin & Mineral: Lengkap</Text>

      <Text style={styles.subtitle}>💡 Tips Penyajian:</Text>
      <Text style={styles.text}>
        Sajikan dalam keadaan hangat, tambahkan sayur segar atau buah agar lebih
        seimbang gizinya.
      </Text>
    </ScrollView>
  );
}
