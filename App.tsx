import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import ArtikelScreen from './src/screens/ArtikelScreen';
import DetailArtikelScreen from './src/screens/DetailArtikelScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ArtikelStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArtikelList"
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
              // <Icon name="home" size={24} color="blue" />;
              iconName = 'home-outline';
            } else if (route.name === 'Artikel') {
              // <Icon name="book" size={24} color="blue" />;
              iconName = 'book-outline';
            } else if (route.name === 'Profile') {
              // <Icon name="person" size={24} color="blue" />;
              iconName = 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Artikel"
          component={ArtikelStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
