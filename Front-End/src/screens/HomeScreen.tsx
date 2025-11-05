// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function HomeScreen() {
//   const [showModal, setShowModal] = useState(false);
//   const [notifShown, setNotifShown] = useState(false);

//   useEffect(() => {
//     checkNotification();
//   }, []);

//   // Mengecek apakah notifikasi bulan ini sudah ditampilkan
//   const checkNotification = async () => {
//     const lastNotif = await AsyncStorage.getItem('lastNotifMonth');
//     const currentMonth = new Date().getMonth(); // 0 = Januari

//     // Jika belum pernah tampil bulan ini → tampilkan
//     if (lastNotif !== String(currentMonth)) {
//       setShowModal(true);
//       await AsyncStorage.setItem('lastNotifMonth', String(currentMonth));
//       setNotifShown(true);
//     }
//   };

//   // Reset untuk testing supaya notifikasi muncul lagi
//   const resetNotification = async () => {
//     await AsyncStorage.removeItem('lastNotifMonth');
//     setNotifShown(false);
//     setShowModal(false);
//     Alert.alert(
//       '✅ Notifikasi direset — akan muncul lagi saat halaman dibuka.',
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏠 Halaman Utama</Text>

//       <TouchableOpacity style={styles.button} onPress={checkNotification}>
//         <Text style={styles.buttonText}>Cek Notifikasi</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: '#f87171' }]}
//         onPress={resetNotification}
//       >
//         <Text style={styles.buttonText}>Reset Notifikasi (Testing)</Text>
//       </TouchableOpacity>

//       {notifShown && (
//         <Text style={styles.infoText}>
//           ✅ Notifikasi bulan ini sudah tampil
//         </Text>
//       )}

//       {/* Modal Notifikasi */}
//       <Modal
//         transparent
//         visible={showModal}
//         animationType="slide"
//         onRequestClose={() => setShowModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>📅 Pengingat Bulanan</Text>
//             <Text style={styles.modalMessage}>
//               Jangan lupa ke posyandu terdekat bulan ini! 🏥
//             </Text>

//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setShowModal(false)}
//             >
//               <Text style={styles.modalButtonText}>Tutup</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // 🎨 STYLE
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FF',
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 20,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#4f46e5',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   infoText: {
//     marginTop: 10,
//     color: '#10b981',
//     fontWeight: '500',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 25,
//     alignItems: 'center',
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 10,
//   },
//   modalMessage: {
//     fontSize: 15,
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: 20,
//   },
//   modalButton: {
//     backgroundColor: '#4f46e5',
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 25,
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });

import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/HomeScreenStyles';

const dummyArticles = [
  {
    id: '1',
    title: 'Tips Sehat di Musim Hujan',
    content: 'Artikel tentang tips sehat...',
    image: 'https://picsum.photos/400/200?random=1',
  },
  {
    id: '2',
    title: 'Belajar React Native Lebih Cepat',
    content: 'Pelajari React Native lebih dalam...',
    image: 'https://picsum.photos/400/200?random=2',
  },
  {
    id: '3',
    title: 'Produktivitas Kerja dari Rumah',
    content: 'Work from home bisa produktif...',
    image: 'https://picsum.photos/400/200?random=3',
  },
];

const dummyMakanan = [
  {
    id: '1',
    title: 'Nasi Goreng Sehat',
    content: 'Nasi goreng sayuran sehat.',
    image: 'https://picsum.photos/400/400?random=11',
  },
  {
    id: '2',
    title: 'Sup Ayam Bergizi',
    content: 'Sup ayam hangat bergizi.',
    image: 'https://picsum.photos/400/400?random=12',
  },
  {
    id: '3',
    title: 'Salad Buah Segar',
    content: 'Campuran buah segar penuh vitamin.',
    image: 'https://picsum.photos/400/400?random=13',
  },
  {
    id: '4',
    title: 'Smoothie Alpukat',
    content: 'Minuman lembut dari alpukat.',
    image: 'https://picsum.photos/400/400?random=14',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [showModal, setShowModal] = useState(false);
  const [monthName, setMonthName] = useState('');

  useEffect(() => {
    const checkNotification = async () => {
      const today = new Date();
      const month = today.getMonth();
      const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
      ];
      setMonthName(monthNames[month]);

      const lastNotified = await AsyncStorage.getItem('lastNotifiedMonth');

      // 🧪 Versi Testing: selalu tampilkan modal hari ini
      if (lastNotified !== month.toString()) {
        setShowModal(true);
        await AsyncStorage.setItem('lastNotifiedMonth', month.toString());
      }
    };

    checkNotification();
  }, []);

  const renderArticle = ({ item }: any) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => navigation.navigate('DetailArtikel', { article: item })}
    >
      <Image source={{ uri: item.image }} style={styles.articleImage} />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.articleExcerpt}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderMakanan = ({ item }: any) => (
    <TouchableOpacity
      style={styles.foodCard}
      onPress={() => navigation.navigate('DetailMakanan', { makanan: item })}
    >
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.overlay}>
        <Text style={styles.foodTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const limitedArticles = dummyArticles.slice(0, 3);
  const limitedMakanan = dummyMakanan.slice(0, 4);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>👋 Selamat Datang, John!</Text>

      <Image
        source={{ uri: 'https://picsum.photos/800/300' }}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Modal Notifikasi Bulanan */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={localStyles.overlay}>
          <View style={localStyles.modalBox}>
            <Text style={localStyles.title}>📅 Pengingat Bulanan</Text>
            <Text style={localStyles.message}>
              Jangan lupa ke posyandu terdekat karena sudah bulan {monthName}!
            </Text>
            <TouchableOpacity
              style={localStyles.button}
              onPress={() => setShowModal(false)}
            >
              <Text style={localStyles.buttonText}>Oke</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Menu Utama */}
      <Text style={styles.sectionTitle}>Menu Utama</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Makanan')}
        >
          <Text style={styles.menuIcon}>🍚</Text>
          <Text style={styles.menuText}>Makanan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Prediksi')}
        >
          <Text style={styles.menuIcon}>🤖</Text>
          <Text style={styles.menuText}>Prediksi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Pengukuran')}
        >
          <Text style={styles.menuIcon}>📏</Text>
          <Text style={styles.menuText}>Pengukuran</Text>
        </TouchableOpacity>
      </View>

      {/* Rekomendasi Makanan */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitleArtikel}>🍱 Rekomendasi Makanan</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Makanan')}>
          <Text style={styles.seeAll}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.foodGrid}>
        {limitedMakanan.map(item => (
          <View key={item.id} style={styles.foodWrapper}>
            {renderMakanan({ item })}
          </View>
        ))}
      </View>

      {/* Artikel Terbaru */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitleArtikel}>📰 Artikel Terbaru</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Artikel')}>
          <Text style={styles.seeAll}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={limitedArticles}
        keyExtractor={item => item.id}
        renderItem={renderArticle}
        scrollEnabled={false}
        contentContainerStyle={{ marginBottom: 20 }}
      />
    </ScrollView>
  );
}

// 🌈 Style lokal untuk modal
const localStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
