import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import { styles } from './styles/AnakScreenStyles';
import { getMyBalita } from '../service/balitaService';

interface Balita {
  id_balita: number;
  id_orangtua: number;
  nama_balita: string;
  tgl_lahir: string;
  jenis_kelamin: 'L' | 'P';
}

export default function AnakScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [dataAnak, setDataAnak] = useState<Balita[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDataAnak = async () => {
    try {
      const response = await getMyBalita();
      setDataAnak(response.balitas || []);
    } catch (error) {
      console.error('Gagal mengambil data anak:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataAnak();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.newBalita) {
        setDataAnak(prev => [route.params.newBalita, ...prev]);
        navigation.setParams({ newBalita: undefined });
      }
    }, [route.params?.newBalita]),
  );

  const renderCard: ListRenderItem<Balita> = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailAnak', { dataAnak: item })}
    >
      <View style={styles.nomorWrapper}>
        <Text style={styles.nomor}>{index + 1}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.nama}>{item.nama_balita}</Text>
        <Text style={styles.umur}>Tanggal Lahir: {item.tgl_lahir}</Text>
        <Text style={styles.umur}>Jenis Kelamin: {item.jenis_kelamin}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6B4EFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TambahAnak')}
        >
          <Text style={styles.buttonText}>+ Tambah Anak</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataAnak}
        renderItem={renderCard}
        keyExtractor={item => item.id_balita.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
