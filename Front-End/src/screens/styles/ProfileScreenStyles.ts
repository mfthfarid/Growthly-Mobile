import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },

  // ===== HEADER SECTION =====
  headerSection: {
    alignItems: 'center',
    paddingVertical: 2,
    paddingTop: 35,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#b67be9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  avatarText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: '700',
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    textAlign: 'center',
  },

  email: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
    textAlign: 'center',
  },

  // ===== INFO CARDS SECTION =====
  infoCardsContainer: {
    marginVertical: 24,
    gap: 12,
  },

  infoCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  infoCardIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
  },

  infoCardContent: {
    flex: 1,
  },

  infoCardLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  infoCardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  // ===== BUTTON SECTION =====
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginTop: 'auto',
    marginBottom: 30,
  },

  buttonEdit: {
    backgroundColor: '#7b2cbf',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#7b2cbf',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  buttonLogout: {
    backgroundColor: '#dc3545',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#dc3545',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
