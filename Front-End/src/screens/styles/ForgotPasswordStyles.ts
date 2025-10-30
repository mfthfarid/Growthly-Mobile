import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8e7dff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    borderWidth: 0, // Agar border tidak muncul dua kali
  },
  toggleBtn: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    width: '80%',
    alignItems: 'center',
    elevation: 8,
  },
  errorCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  errorX: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  successCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  successCheck: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeBtn: {
    backgroundColor: '#6c63ff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default styles;
