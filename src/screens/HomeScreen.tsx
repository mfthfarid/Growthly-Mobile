import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>👋 Selamat Datang, John!</Text>

      {/* Banner */}
      <Image
        source={{ uri: 'https://picsum.photos/800/300' }}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Menu Utama</Text>

      {/* Menu Cards */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuCard}>
          <Text style={styles.menuIcon}>📰</Text>
          <Text style={styles.menuText}>Artikel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard}>
          <Text style={styles.menuIcon}>📊</Text>
          <Text style={styles.menuText}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard}>
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3, // untuk shadow di Android
    shadowColor: '#000', // untuk shadow di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
