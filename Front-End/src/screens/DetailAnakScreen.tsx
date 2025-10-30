import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles/DetailAnakScreenStyles';

export default function DetailAnakScreen({ route }: any) {
  const { dataAnak } = route.params;
  const navigation = useNavigation<any>();

  const handleUpdate = () => {
    navigation.navigate('UpdateAnak', { dataAnak: dataAnak });
  };

  return (
    <ScrollView style={styles.container}>
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
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
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
