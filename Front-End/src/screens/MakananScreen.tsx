import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/MakananScreenStyles';
import { getMakanan } from '../service/makananService';
import { IMAGE_BASE_URL } from '../service/apiService';
import { Makanan } from '../types/types';

export default function MakananScreen() {
  const navigation = useNavigation<any>();
  const [makanan, setMakanan] = useState<Makanan[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchMakanan = async () => {
    try {
      setLoading(true);
      const response = await getMakanan();

      if (Array.isArray(response)) {
        setMakanan(response);
      } else {
        setMakanan([]);
      }
    } catch (error: any) {
      console.error('Gagal mengambil artikel:', error);
      Alert.alert('Error', error.message || 'Gagal mengambil data artikel');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMakanan();
  }, []);

  const renderItem = ({ item }: { item: Makanan }) => {
    // Bangun URL gambar jika ada foto
    const imageUrl = item.foto
      ? `${IMAGE_BASE_URL}/makanan/${item.foto}` // Gabung base URL + nama file
      : null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log('Navigating with food:', item); // Tambahkan log ini
          navigation.navigate('DetailMakanan', { food: item });
        }}
      >
        {/* <Image source={{ uri: item.foto }} style={styles.image} /> */}
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.nama_makanan}</Text>
          <Text numberOfLines={2} style={styles.excerpt}>
            {item.isi}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (makanan.length === 0) {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.header}>📰 Daftar Artikel</Text> */}
        <Text style={styles.emptyMessage}>Belum ada daftar makanan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={makanan}
        // keyExtractor={item => item.id}
        keyExtractor={item =>
          item.id_makanan?.toString() || Math.random().toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
