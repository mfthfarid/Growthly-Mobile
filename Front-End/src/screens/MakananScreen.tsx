import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/MakananScreenStyles';

const dummyMakanan = [
  {
    id: '1',
    title: 'Nasi Uduk',
    image: 'https://picsum.photos/400/200?random=11',
    gizi: 'Karbohidrat, Protein, Lemak, Vitamin B',
    manfaat: 'Memberikan energi dan protein untuk pertumbuhan anak.',
    deskripsi:
      'Nasi uduk adalah nasi yang dimasak dengan santan dan rempah-rempah khas Indonesia.',
  },
  {
    id: '2',
    title: 'Sayur Bayam',
    image: 'https://picsum.photos/400/200?random=12',
    gizi: 'Zat Besi, Vitamin A, Vitamin C, Kalsium',
    manfaat: 'Meningkatkan daya tahan tubuh dan menjaga kesehatan mata.',
    deskripsi:
      'Sayur bayam mengandung banyak zat gizi penting untuk pertumbuhan anak.',
  },
  {
    id: '3',
    title: 'Ikan Salmon',
    image: 'https://picsum.photos/400/200?random=13',
    gizi: 'Protein, Omega-3, Vitamin D',
    manfaat: 'Mendukung perkembangan otak anak.',
    deskripsi:
      'Ikan salmon adalah sumber protein dan asam lemak esensial yang baik.',
  },
];

export default function MakananScreen() {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailMakanan', { makanan: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.excerpt}>
          {item.deskripsi}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyMakanan}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
