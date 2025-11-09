import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { petData } from '../data/petData';

export default function PetDetailScreen({ route, navigation }) {
  const { petName } = route.params;
  const pet = petData[petName];

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Улюбленця не знайдено</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: pet.color }]}>
          <Text style={styles.avatarText}>{pet.name[0]}</Text>
        </View>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.breed}>{pet.breed}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Поточний Статус</Text>
        <StatusItem
          icon="restaurant"
          label="Останній прийом їжі:"
          value="Сьогодні, 11:00"
        />
        <StatusItem
          icon="footsteps"
          label="Остання прогулянка:"
          value="Сьогодні, 12:30"
        />
        <StatusItem
          icon="medical"
          label="Вакцинація (від сказу):"
          value="15.03.2025 (План)"
          valueColor="#10B981"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Планувальник</Text>
        <View style={styles.eventCard}>
          <View style={styles.eventIcon}>
            <Ionicons name="heart" size={24} color="#DC2626" />
          </View>
          <View>
            <Text style={styles.eventTitle}>Візит до ветеринара</Text>
            <Text style={styles.eventDate}>28 жовтня, 14:00</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addEventButton}>
          <Ionicons name="calendar" size={20} color="#FFFFFF" />
          <Text style={styles.addEventText}>Запланувати нову подію</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#DC2626" />
        <Text style={styles.deleteText}>Видалити улюбленця</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function StatusItem({ icon, label, value, valueColor = '#1F2937' }) {
  return (
    <View style={styles.statusItem}>
      <View style={styles.statusLabel}>
        <Ionicons name={icon} size={20} color="#2563EB" />
        <Text style={styles.statusLabelText}>{label}</Text>
      </View>
      <Text style={[styles.statusValue, { color: valueColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  breed: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statusLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabelText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 12,
  },
  eventIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  eventDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  addEventButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addEventText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});