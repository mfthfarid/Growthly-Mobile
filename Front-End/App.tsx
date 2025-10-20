import * as React from 'react';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import LoginScreen from './src/screens/Auth/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ArtikelScreen from './src/screens/ArtikelScreen';
import DetailArtikelScreen from './src/screens/DetailArtikelScreen';
import MenuAnakScreen from './src/screens/MenuAnakScreen';
import DetailAnakScreen from './src/screens/DetailAnakScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
      <Stack.Screen
        name="DetailAnak"
        component={DetailAnakScreen}
        options={{ title: 'Detail Anak' }}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'home';

          if (route.name === 'Beranda') {
            iconName = 'home';
          } else if (route.name === 'Menu Anak') {
            iconName = 'child';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#756AB6' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Beranda"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Menu Anak" component={MenuAnakScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {props => (
              <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
