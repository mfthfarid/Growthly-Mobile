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
import styles from './styles/ArtikelScreenStyles';

// const dummyArticles = [
//   {
//     id: '1',
//     title: 'Tips Sehat di Musim Hujan',
//     content:
//       'Ini adalah isi lengkap artikel tentang tips sehat di musim hujan...',
//     image: 'https://picsum.photos/400/200?random=1',
//   },
//   {
//     id: '2',
//     title: 'Belajar React Native Lebih Cepat',
//     content:
//       'React Native adalah framework cross-platform, yuk pelajari lebih dalam...',
//     image: 'https://picsum.photos/400/200?random=2',
//   },
//   {
//     id: '3',
//     title: 'Produktivitas Kerja dari Rumah',
//     content:
//       'Work from home bisa produktif kalau tahu cara mengatur waktu dengan baik...',
//     image: 'https://picsum.photos/400/200?random=3',
//   },
//   {
//     id: '4',
//     title: 'Hidup Sehat dengan Pola Tidur Teratur',
//     content:
//       'Kualitas tidur sangat berpengaruh pada imunitas tubuh dan konsentrasi...',
//     image: 'https://picsum.photos/400/200?random=4',
//   },
//   {
//     id: '5',
//     title: 'Manfaat Jalan Kaki di Pagi Hari',
//     content:
//       'Selain menyehatkan jantung, jalan pagi juga membantu memperbaiki mood...',
//     image: 'https://picsum.photos/400/200?random=5',
//   },
// ];

// interface Artikel {
//   id_artikel: number;
//   judul: string;
//   isi: string;
//   penulis: string;
//   foto: string;
// }

export default function ArtikelScreen() {
  const navigation = useNavigation<any>();
  const [artikel, setArtikel] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data artikel dari API
  // const fetchArticles = async () => {
  //   console.log('🔄 fetchArticles dipanggil...');
  //   try {
  //     setLoading(true);
  //     const response = await getArtikel();
  //     console.log('Response lengkap:', response);
  //     console.log('Data artikel:', response.data);

  //     // setArtikel(response.data || []);
  //     // Simulasikan data langsung
  //     setArtikel([
  //       {
  //         id_artikel: 1,
  //         judul: 'Pentingnya Gizi Balita',
  //         isi: 'Artikel tentang pentingnya gizi seimbang untuk balita.',
  //         penulis: 'Admin',
  //         foto: 'https://picsum.photos/400/200?random=1',
  //       },
  //     ]);
  //   } catch (error: any) {
  //     console.error('Gagal mengambil artikel:', error);
  //     Alert.alert('Error', error.message || 'Gagal mengambil data artikel');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchArticles = async () => {
    console.log('🔄 fetchArticles dipanggil...');
    try {
      setLoading(true);
      const response = await getArtikel(); // <-- response adalah hasil dari response.json()
      console.log('Response dari service (sudah JSON):', response);

      if (Array.isArray(response)) {
        console.log('✅ Menyimpan data ke state:', response);
        setArtikel(response);
      } else {
        console.warn('❌ Response bukan array:', response);
        setArtikel([]);
      }
    } catch (error: any) {
      console.error('Gagal mengambil artikel:', error);
      Alert.alert('Error', error.message || 'Gagal mengambil data artikel');
    } finally {
      setLoading(false);
    }
  };

  // Tambahkan useEffect ini untuk melihat perubahan state
  // useEffect(() => {
  //   console.log('State artikel berubah:', artikel);
  // }, [artikel]);

  // Panggil fetchArticles saat komponen dimount
  useEffect(() => {
    fetchArticles();
  }, []);

  const renderItem = ({ item }: { item: Artikel }) => (
    <TouchableOpacity
      style={styles.card}
      // Pastikan item memiliki struktur yang sama seperti dummy sebelumnya
      // Jika field berbeda, sesuaikan di sini. Misalnya item.judul -> item.title
      onPress={() => navigation.navigate('DetailArtikel', { article: item })}
    >
      {item.foto ? (
        <Image source={{ uri: item.foto }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} /> // Tambahkan style placeholder jika perlu
      )}
      <View style={styles.cardContent}>
        {/* Sesuaikan nama field title dan content dengan yang dikembalikan backend */}
        <Text style={styles.title}>{item.judul}</Text>
        <Text numberOfLines={2} style={styles.excerpt}>
          {item.isi}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Tampilkan loading indicator saat memuat data
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

  // const renderItem = ({ item }: any) => (
  //   <TouchableOpacity
  //     style={styles.card}
  //     onPress={() => navigation.navigate('DetailArtikel', { article: item })}
  //   >
  //     <Image source={{ uri: item.image }} style={styles.image} />
  //     <View style={styles.cardContent}>
  //       <Text style={styles.title}>{item.title}</Text>
  //       <Text numberOfLines={2} style={styles.excerpt}>
  //         {item.content}
  //       </Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  if (artikel.length === 0 && !loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>📰 Daftar Artikel</Text>
        <Text style={styles.emptyMessage}>Belum ada artikel.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📰 Daftar Artikel</Text>
      <FlatList
        data={artikel}
        // keyExtractor={item => item.id}
        keyExtractor={item =>
          item.id_artikel?.toString() || Math.random().toString()
        } // Gunakan field ID unik dari backend
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
