import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    backgroundColor: '#7b2cbf',
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    alignItems: 'center',
  },
  nama: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    flex: 1,
    margin: 4,
    backgroundColor: '#ede0ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  updateButton: {
    backgroundColor: '#7b2cbf',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  grafikCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
});
