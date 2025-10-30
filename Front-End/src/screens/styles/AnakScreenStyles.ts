import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  nomorWrapper: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nomor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  infoWrapper: {
    flex: 1,
  },
  nama: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  umur: {
    fontSize: 14,
    color: '#555',
  },
});
