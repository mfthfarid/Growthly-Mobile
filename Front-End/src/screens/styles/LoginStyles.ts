// src/screens/Auth/LoginStyles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollContent: {
    // Jika kamu ingin isi scroll mengisi setidaknya tinggi layar penuh
    // tambahkan ini:
    minHeight: '100%',
    // Tapi biasanya tidak perlu
    // marginTop: 20,
    // paddingVertical: 20,
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

export default styles;
