import React, { useEffect, useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getArtikel } from '../service/artikelService';
import { Artikel } from '../types/types';
import { IMAGE_BASE_URL } from '../service/apiService';
import styles from './styles/ArtikelScreenStyles';

export default function ArtikelScreen() {
  const navigation = useNavigation<any>();
  const [artikel, setArtikel] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    // console.log('🔄 fetchArticles dipanggil...');
    try {
      setLoading(true);
      const response = await getArtikel();
      // console.log('Response dari service (sudah JSON):', response);

      if (Array.isArray(response)) {
        // console.log('✅ Menyimpan data ke state:', response);
        setArtikel(response);
      } else {
        // console.warn('❌ Response bukan array:', response);
        setArtikel([]);
      }
    } catch (error: any) {
      console.error('Gagal mengambil artikel:', error);
      Alert.alert('Error', error.message || 'Gagal mengambil data artikel');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const renderItem = ({ item }: { item: Artikel }) => {
    // console.log('Item foto:', item.foto); // <-- Tetap bisa log, tapi lebih rapi

    // Bangun URL gambar jika ada foto
    const imageUrl = item.foto
      ? `${IMAGE_BASE_URL}/artikel/${item.foto}` // Gabung base URL + nama file
      : null;
    // console.log('Full image URL:', imageUrl);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('DetailArtikel', { article: item })}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.judul}</Text>
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

  if (artikel.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>📰 Daftar Artikel</Text>
        <Text style={styles.emptyMessage}>Belum ada artikel.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>📰 Daftar Artikel</Text> */}
      <FlatList
        data={artikel}
        keyExtractor={item =>
          item.id_artikel?.toString() || Math.random().toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
