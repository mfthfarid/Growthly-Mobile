import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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

  const handleLogout = async () => {
    onLogout(); // ✅ panggil ke App untuk setIsLoggedIn(false)
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
        style={styles.avatar}
      />

      <Text style={styles.name}>{user?.nama_orangtua || 'Memuat...'}</Text>
      <Text style={styles.email}>{user ? `@${user.username}` : ''}</Text>

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
    </View>
  );
}
