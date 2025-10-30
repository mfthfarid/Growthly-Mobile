import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './styles/DetailMakananScreenStyles';

export default function DetailMakananScreen({ route }: any) {
  const { makanan } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: makanan.image }} style={styles.image} />
      <Text style={styles.title}>{makanan.title}</Text>
      <Text style={styles.content}>{makanan.content}</Text>

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
