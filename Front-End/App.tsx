// import * as React from 'react';
// import { TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootStackParamList } from './src/types/types';
// import { useNavigation } from '@react-navigation/native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // 🔹 Import semua screen
// import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen';
// import RegisterScreen from './src/screens/Auth/RegisterScreen';
// import LoginScreen from './src/screens/Auth/LoginScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import ArtikelScreen from './src/screens/ArtikelScreen';
// import DetailArtikelScreen from './src/screens/DetailArtikelScreen';
// import MenuAnakScreen from './src/screens/MenuAnakScreen';
// import DetailAnakScreen from './src/screens/DetailAnakScreen';
// import TambahAnakScreen from './src/screens/TambahAnakScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import EditProfileScreen from './src/screens/EditProfileScreen';

// // 🔹 Tambahan baru
// import MakananScreen from './src/screens/MakananScreen';
// import DetailMakananScreen from './src/screens/DetailMakananScreen';
// import PrediksiScreen from './src/screens/PrediksiScreen';
// import PengukuranScreen from './src/screens/PengukuranScreen';
// import NotifikasiScreen from './src/screens/NotifikasiScreen';

// // const navigation = useNavigation<any>();
// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleAlign: 'center',
//         headerStyle: { backgroundColor: '#756AB6' },
//         headerTintColor: '#fff',
//       }}
//     >
//       <Stack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={({ navigation }) => ({
//           title: 'Beranda',
//           headerRight: () => (
//             <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
//               <Ionicons name="notifications" size={24} color="white" />
//             </TouchableOpacity>
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="Notifikasi"
//         component={NotifikasiScreen}
//         options={{ title: 'Notifikasi' }}
//       />
//       <Stack.Screen
//         name="Artikel"
//         component={ArtikelScreen}
//         options={{ title: 'Artikel' }}
//       />
//       <Stack.Screen
//         name="DetailArtikel"
//         component={DetailArtikelScreen}
//         options={{ title: 'Detail Artikel' }}
//       />
//       <Stack.Screen
//         name="Makanan"
//         component={MakananScreen}
//         options={{ title: 'Rekomendasi Makanan' }}
//       />
//       <Stack.Screen
//         name="DetailMakanan"
//         component={DetailMakananScreen}
//         options={{ title: 'Detail Makanan' }}
//       />
//       <Stack.Screen
//         name="Prediksi"
//         component={PrediksiScreen}
//         options={{ title: 'Prediksi' }}
//       />
//       <Stack.Screen
//         name="Pengukuran"
//         component={PengukuranScreen}
//         options={{ title: 'Pengukuran' }}
//       />
//     </Stack.Navigator>
//   );
// }

// function MenuAnakStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleAlign: 'center',
//         headerStyle: { backgroundColor: '#756AB6' },
//         headerTintColor: '#fff',
//       }}
//     >
//       <Stack.Screen
//         name="MenuAnakScreen"
//         component={MenuAnakScreen}
//         options={{ title: 'Menu Anak' }}
//       />
//       <Stack.Screen
//         name="TambahAnak"
//         component={TambahAnakScreen}
//         options={{ title: 'Tambah Anak' }}
//       />
//       <Stack.Screen
//         name="DetailAnak"
//         component={DetailAnakScreen}
//         options={{ title: 'Detail Anak' }}
//       />
//     </Stack.Navigator>
//   );
// }

// function ProfileStack({ onLogout }: any) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleAlign: 'center',
//         headerStyle: { backgroundColor: '#756AB6' },
//         headerTintColor: '#fff',
//       }}
//     >
//       <Stack.Screen name="ProfileScreen" options={{ title: 'Profil' }}>
//         {(props: any) => <ProfileScreen {...props} onLogout={onLogout} />}
//       </Stack.Screen>
//       {/* <Stack.Screen
//         name="ProfileScreen"
//         component={ProfileScreen}
//         options={{ title: 'Profil' }}
//       >
//         {props => <ProfileScreen {...props} onLogout={onLogout} />}
//       </Stack.Screen> */}
//       <Stack.Screen
//         name="EditProfile"
//         component={EditProfileScreen}
//         options={{ title: 'Edit Profil' }}
//       />
//     </Stack.Navigator>
//   );
// }

// function AppTabs({ onLogout }: any) {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName: string = 'home';
//           if (route.name === 'Beranda') iconName = 'home';
//           else if (route.name === 'Menu Anak') iconName = 'child';
//           else if (route.name === 'Profile') iconName = 'user';
//           return <FontAwesome5 name={iconName} size={size} color={color} />;
//         },
//         headerTitleAlign: 'center',
//         headerStyle: { backgroundColor: '#756AB6' },
//         headerTintColor: '#fff',
//         tabBarActiveTintColor: '#756AB6',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       <Tab.Screen
//         name="Beranda"
//         component={HomeStack}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="Menu Anak"
//         component={MenuAnakStack}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="Profile"
//         // component={ProfileStack}
//         options={{ headerShown: false }}
//       >
//         {props => <ProfileStack {...props} onLogout={onLogout} />}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);

//   const onLogout = async () => {
//     await AsyncStorage.removeItem('userToken');
//     await AsyncStorage.removeItem('userData');
//     setIsLoggedIn(false); // kembali ke login
//   };

//   return (
//     <NavigationContainer>
//       {isLoggedIn ? (
//         <AppTabs onLogout={onLogout} />
//       ) : (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Login">
//             {props => (
//               <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
//             )}
//           </Stack.Screen>
//           <Stack.Screen
//             name="Register"
//             component={RegisterScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="ForgotPassword"
//             component={ForgotPasswordScreen}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// }

import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/types';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 🔹 Import semua screen
import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ArtikelScreen from './src/screens/ArtikelScreen';
import DetailArtikelScreen from './src/screens/DetailArtikelScreen';
import MenuAnakScreen from './src/screens/MenuAnakScreen';
import DetailAnakScreen from './src/screens/DetailAnakScreen';
import TambahAnakScreen from './src/screens/TambahAnakScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

// 🔹 Tambahan baru
import MakananScreen from './src/screens/MakananScreen';
import DetailMakananScreen from './src/screens/DetailMakananScreen';
import PrediksiScreen from './src/screens/PrediksiScreen';
import PengukuranScreen from './src/screens/PengukuranScreen';
import NotifikasiScreen from './src/screens/NotifikasiScreen';

// 🔹 Deklarasikan Stack dengan tipe RootStackParamList
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#756AB6' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Beranda',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifikasi' as never)}
            >
              <Ionicons name="notifications" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      {/* ... screen lain ... */}
      <Stack.Screen
        name="DetailArtikel"
        component={DetailArtikelScreen}
        options={{ title: 'Detail Artikel' }}
      />
      <Stack.Screen
        name="DetailMakanan"
        component={DetailMakananScreen}
        options={{ title: 'Detail Makanan' }}
      />
      {/* Tambahkan semua screen lain yang ada di HomeStack dan sesuai RootStackParamList */}
      <Stack.Screen
        name="Notifikasi"
        component={NotifikasiScreen}
        options={{ title: 'Notifikasi' }}
      />
      <Stack.Screen
        name="Artikel"
        component={ArtikelScreen}
        options={{ title: 'Artikel' }}
      />
      <Stack.Screen
        name="Makanan"
        component={MakananScreen}
        options={{ title: 'Rekomendasi Makanan' }}
      />
      <Stack.Screen
        name="Prediksi"
        component={PrediksiScreen}
        options={{ title: 'Prediksi' }}
      />
      <Stack.Screen
        name="Pengukuran"
        component={PengukuranScreen}
        options={{ title: 'Pengukuran' }}
      />
    </Stack.Navigator>
  );
}

function MenuAnakStack() {
  // Gunakan Stack yang sama (dengan tipe)
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#756AB6' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="MenuAnakScreen"
        component={MenuAnakScreen}
        options={{ title: 'Menu Anak' }}
      />
      <Stack.Screen
        name="TambahAnak"
        component={TambahAnakScreen}
        options={{ title: 'Tambah Anak' }}
      />
      <Stack.Screen
        name="DetailAnak"
        component={DetailAnakScreen}
        options={{ title: 'Detail Anak' }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack({ onLogout }: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#756AB6' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="ProfileScreen" options={{ title: 'Profil' }}>
        {(props: any) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Edit Profil' }}
      />
    </Stack.Navigator>
  );
}

function AppTabs({ onLogout }: any) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'home';
          if (route.name === 'Beranda') iconName = 'home';
          else if (route.name === 'Menu Anak') iconName = 'child';
          else if (route.name === 'Profile') iconName = 'user';
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#756AB6' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#756AB6',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Beranda"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Menu Anak"
        component={MenuAnakStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" options={{ headerShown: false }}>
        {props => <ProfileStack {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const onLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    setIsLoggedIn(false);
  };
  //
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppTabs onLogout={onLogout} />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {props => (
              <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
