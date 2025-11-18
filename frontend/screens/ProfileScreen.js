import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authAPI } from '../services/api';

export default function ProfileScreen({ navigation }) {
  const handleLogout = async () => {
    await authAPI.logout();
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.email}>user@petcare.com</Text>
        <Text style={styles.joinDate}>Приєднався: 25.10.2025</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Редагувати профіль</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        <MenuItem
          icon="bar-chart"
          title="Моя статистика"
          onPress={() => {}}
        />
        <MenuItem
          icon="trophy"
          title="Досягнення"
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Вийти з акаунту</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MenuItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={20} color="#2563EB" />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  email: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#1D4ED8',
    fontSize: 16,
    fontWeight: '600',
  },
  menuSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});