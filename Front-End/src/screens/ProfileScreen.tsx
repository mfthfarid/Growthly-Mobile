import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles/ProfileScreenStyles';

export default function ProfileScreen({ onLogout }: any) {
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Gagal memuat data user:', error);
      }
    };
    fetchUserData();
  }, []);

  const getAvatarInitial = () => {
    return user?.nama_orangtua
      ? user.nama_orangtua.charAt(0).toUpperCase()
      : '?';
  };

  const handleLogout = async () => {
    onLogout();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER SECTION */}
      <View style={styles.headerSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getAvatarInitial()}</Text>
        </View>
        <Text style={styles.name}>{user?.nama_orangtua || 'Memuat...'}</Text>
        <Text style={styles.email}>{user ? `@${user.username}` : ''}</Text>
      </View>

      {/* INFO CARDS */}
      {user && (
        <View style={styles.infoCardsContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardIcon}>👤</Text>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Nama Lengkap</Text>
              <Text style={styles.infoCardValue}>{user.nama_orangtua}</Text>
            </View>
          </View>

          {/* <View style={styles.infoCard}>
            <Text style={styles.infoCardIcon}>📧</Text>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Email</Text>
              <Text style={styles.infoCardValue}>
                {user.email || 'Tidak tersedia'}
              </Text>
            </View>
          </View> */}

          <View style={styles.infoCard}>
            <Text style={styles.infoCardIcon}>📞</Text>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>No. Telepon</Text>
              <Text style={styles.infoCardValue}>
                {user.no_hp || 'Tidak tersedia'}
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardIcon}>🏠</Text>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Alamat</Text>
              <Text style={styles.infoCardValue}>
                {user.alamat || 'Tidak tersedia'}
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardIcon}>💰</Text>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Pendapatan</Text>
              <Text style={styles.infoCardValue}>
                {user.pendapatan || 'Tidak tersedia'}
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardIcon}>🌍</Text>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Wilayah</Text>
              <Text style={styles.infoCardValue}>
                {user.wilayah || 'Tidak tersedia'}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => navigation.navigate('EditProfile' as never)}
        >
          <Text style={styles.buttonText}>✏️ Edit Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={styles.buttonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
