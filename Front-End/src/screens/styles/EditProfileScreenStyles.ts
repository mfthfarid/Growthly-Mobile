import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginLeft: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  passwordInput: {
    flex: 1,
  },

  toggleBtn: {
    padding: 8,
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
