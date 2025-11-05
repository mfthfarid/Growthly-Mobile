import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../service/userService'; // <= sesuaikan path

interface LoginParams {
  username: string;
  password: string;
}

interface AuthContextType {
  user: any;
  authToken: string | null;
  login: (data: LoginParams) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const login = async ({ username, password }: LoginParams) => {
    try {
      const result = await loginUser({ username, password });

      if (result.token) {
        await AsyncStorage.setItem('userToken', result.token);
        await AsyncStorage.setItem('userData', JSON.stringify(result.user));

        setUser(result.user);
        setAuthToken(result.token);

        return { success: true };
      } else {
        return { success: false, message: result.message || 'Login gagal' };
      }
    } catch (error) {
      return { success: false, message: 'Terjadi kesalahan server' };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');

    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
