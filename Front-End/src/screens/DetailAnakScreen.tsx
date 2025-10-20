import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function DetailAnakScreen({ route }: any) {
  const { dataAnak } = route.params;
  const navigation = useNavigation<any>();

  const handleUpdate = () => {
    navigation.navigate('UpdateAnak', { dataAnak: dataAnak });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tombol Back */}
      <TouchableOpacity
        // onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={{ color: '#fff' }}>← Back</Text>
      </TouchableOpacity>

      {/* Profil Anak */}
      <View style={styles.profileCard}>
        <Text style={styles.nama}>{dataAnak.nama}</Text>
        <Text style={styles.subText}>{dataAnak.umur}</Text>
      </View>

      {/* Hasil Pertumbuhan */}
      <Text style={styles.sectionTitle}>Hasil Pertumbuhan</Text>
      <View style={styles.row}>
        <View style={styles.infoBox}>
          <Text>Umur</Text>
          <Text style={styles.value}>{dataAnak.umur}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Berat</Text>
          <Text style={styles.value}>{dataAnak.berat}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Tinggi</Text>
          <Text style={styles.value}>{dataAnak.tinggi}</Text>
        </View>
      </View>

      {/* Tombol Update */}
      <TouchableOpacity style={styles.updateButton}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Update</Text>
      </TouchableOpacity>

      {/* Grafik Placeholder */}
      <View style={styles.grafikCard}>
        <Text style={styles.sectionTitle}>Grafik WHO</Text>
        <Text style={{ color: '#999' }}>[Grafik akan ditampilkan di sini]</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  backButton: {
    backgroundColor: '#7b2cbf',
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    alignItems: 'center',
  },
  nama: { fontSize: 18, fontWeight: 'bold' },
  subText: { fontSize: 14, color: '#666', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  infoBox: {
    flex: 1,
    margin: 4,
    backgroundColor: '#ede0ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  value: { fontSize: 14, fontWeight: 'bold', marginTop: 4 },
  updateButton: {
    backgroundColor: '#7b2cbf',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  grafikCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
});
