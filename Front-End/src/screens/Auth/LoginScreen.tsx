// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { ParamListBase } from '@react-navigation/native';

// type Props = NativeStackScreenProps<ParamListBase, 'Login'> & {
//   onLogin: () => void;
// };

// const LoginScreen: React.FC<Props> = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Email dan password wajib diisi!');
//       return;
//     }
//     console.log('Login attempt:', { email, password });

//     // simulasi login sukses
//     onLogin();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.select({ ios: 'padding', android: undefined })}
//         style={styles.innerContainer}
//       >
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>Sign in to your account</Text>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email Address</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             autoCorrect={false}
//             value={email}
//             onChangeText={setEmail}
//             textContentType="emailAddress"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Password</Text>
//           <View style={styles.passwordRow}>
//             <TextInput
//               style={[styles.input, { flex: 1 }]}
//               placeholder="Enter your password"
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={setPassword}
//               autoCapitalize="none"
//               autoCorrect={false}
//               textContentType="password"
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               style={styles.showButton}
//             >
//               <Text style={styles.showButtonText}>
//                 {showPassword ? 'Hide' : 'Show'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginButtonText}>Sign In</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//   },
//   innerContainer: {
//     flex: 1,
//     paddingHorizontal: 24,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#1f2937',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//     textAlign: 'center',
//     marginBottom: 32,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 6,
//     fontSize: 14,
//     color: '#374151',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderColor: '#d1d5db',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#111827',
//   },
//   passwordRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   showButton: {
//     marginLeft: 12,
//   },
//   showButtonText: {
//     color: '#3b82f6',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   loginButton: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { ParamListBase } from '@react-navigation/native';

// type Props = NativeStackScreenProps<ParamListBase, 'Login'> & {
//   onLogin: () => void;
// };

// const LoginScreen: React.FC<Props> = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Email dan password wajib diisi!');
//       return;
//     }
//     console.log('Login attempt:', { email, password });

//     // simulasi login sukses
//     onLogin();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.select({ ios: 'padding', android: undefined })}
//         style={styles.innerContainer}
//       >
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>Sign in to your account</Text>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email Address</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             autoCorrect={false}
//             value={email}
//             onChangeText={setEmail}
//             textContentType="emailAddress"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Password</Text>
//           <View style={styles.passwordRow}>
//             <TextInput
//               style={[styles.input, { flex: 1 }]}
//               placeholder="Enter your password"
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={setPassword}
//               autoCapitalize="none"
//               autoCorrect={false}
//               textContentType="password"
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               style={styles.showButton}
//             >
//               <Text style={styles.showButtonText}>
//                 {showPassword ? 'Hide' : 'Show'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginButtonText}>Sign In</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//   },
//   innerContainer: {
//     flex: 1,
//     paddingHorizontal: 24,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#1f2937',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//     textAlign: 'center',
//     marginBottom: 32,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 6,
//     fontSize: 14,
//     color: '#374151',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderColor: '#d1d5db',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#111827',
//   },
//   passwordRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   showButton: {
//     marginLeft: 12,
//   },
//   showButtonText: {
//     color: '#3b82f6',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   loginButton: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });

import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import CustomInput from '../../components/CustomInput';

const LoginScreen = ({ navigation, onLogin }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setShowError(true);
    } else {
      // navigation.navigate('Beranda');
      onLogin(); // ini akan men-trigger setIsLoggedIn(true)
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo1.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Selamat Datang</Text>

      <CustomInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <CustomInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.toggleBtn}
        >
          <Text>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginBottom: 20 }}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.linkText}>Lupa password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>atau</Text>
        <View style={styles.separator} />
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text>Belum punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: '#8e7dff', fontWeight: 'bold' }}>Daftar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={showError}
        animationType="fade"
        onRequestClose={() => setShowError(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.errorCircle}>
              <Text style={styles.errorX}>✕</Text>
            </View>

            <Text style={styles.modalTitle}>Terjadi Kesalahan!</Text>
            <Text style={styles.modalMessage}>
              Masukkan email atau password terlebih dahulu!
            </Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowError(false)}
            >
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={showSuccess}
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.successCircle}>
              <Text style={styles.successCheck}>✓</Text>
            </View>

            <Text style={styles.modalTitle}>Berhasil!</Text>
            <Text style={styles.modalMessage}>
              Login berhasil, selamat datang kembali!
            </Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowSuccess(false)}
            >
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#444',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    borderWidth: 0,
  },
  toggleBtn: {
    padding: 10,
  },
  loginBtn: {
    backgroundColor: '#8e7dff',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#888',
  },
  linkText: {
    color: '#8e7dff',
  },

  // Popup umum
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
  },
  closeBtn: {
    marginTop: 10,
    backgroundColor: '#8e7dff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Style popup error
  errorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF4C4C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  errorX: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },

  // Style popup sukses
  successCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  successCheck: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});
