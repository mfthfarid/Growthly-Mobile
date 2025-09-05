import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from './src/screens/HomeScreen';
import ArtikelScreen from './src/screens/ArtikelScreen';
import DetailArtikelScreen from './src/screens/DetailArtikelScreen';
import MenuAnakScreen from './src/screens/MenuAnakScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // semua judul otomatis center
        headerStyle: { backgroundColor: '#756AB6' }, // warna background header
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Beranda' }}
      />
      <Stack.Screen
        name="Artikel"
        component={ArtikelScreen}
        options={{ title: 'Artikel' }}
      />
      <Stack.Screen
        name="DetailArtikel"
        component={DetailArtikelScreen}
        options={{ title: 'Detail Artikel' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = 'home';

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Menu Anak') {
              iconName = 'child';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          headerTitleAlign: 'center', // judul header center
          headerStyle: { backgroundColor: '#756AB6' }, // warna background header
          headerTintColor: '#fff',
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Beranda"
          component={HomeStack}
          options={{ headerShown: false }} // biar header stack ga dobel
        />
        <Tab.Screen name="Menu Anak" component={MenuAnakScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
