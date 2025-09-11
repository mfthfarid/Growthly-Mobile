import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dataAnak = [
  { id: '1', nama: 'Budi', umur: 10 },
  { id: '2', nama: 'Siti', umur: 8 },
  { id: '3', nama: 'Andi', umur: 6 },
];

export default function App() {
  const navigation = useNavigation<any>();

  const renderCard: ListRenderItem<any> = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailArtikel', { dataAnak: item })}
    >
      {/* Nomor di kiri */}
      <View style={styles.nomorWrapper}>
        <Text style={styles.nomor}>{index + 1}</Text>
      </View>

      {/* Nama + umur di kanan */}
      <View style={styles.infoWrapper}>
        <Text style={styles.nama}>{item.nama}</Text>
        <Text style={styles.umur}>Umur: {item.umur} tahun</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Button tambah anak di pojok kanan atas */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Tambah Anak</Text>
        </TouchableOpacity>
      </View>

      {/* List berbentuk card */}
      <FlatList
        data={dataAnak}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row', // baris
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  nomorWrapper: {
    width: 40, // supaya nomor punya area tetap
    justifyContent: 'center',
    alignItems: 'center',
  },
  nomor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  infoWrapper: {
    flex: 1, // isi penuh di kanan
  },
  nama: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  umur: {
    fontSize: 14,
    color: '#555',
  },
});
