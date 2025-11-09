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

export default function MyPetsScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="settings-outline" size={24} color="#2563EB" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мої Улюбленці</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPet')}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <PetCard
        name="Барсик"
        breed="Шотландський висловухий"
        lastFed="2г тому"
        lastWalk="1г тому"
        color="#E0F2FE"
        onPress={() => navigation.navigate('PetDetail', { petName: 'Барсик' })}
      />

      <PetCard
        name="Рекс"
        breed="Золотистий ретривер"
        lastFed="4г тому"
        lastWalk="30хв тому"
        color="#FFFBEB"
        onPress={() => navigation.navigate('PetDetail', { petName: 'Рекс' })}
      />
    </ScrollView>
  );
}

function PetCard({ name, breed, lastFed, lastWalk, color, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.avatar, { backgroundColor: color }]}>
        <Text style={styles.avatarText}>{name[0]}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.petName}>{name}</Text>
        <Text style={styles.petBreed}>{breed}</Text>
        <View style={styles.statusRow}>
          <View style={styles.status}>
            <Ionicons name="restaurant" size={16} color="#10B981" />
            <Text style={styles.statusText}>{lastFed}</Text>
          </View>
          <View style={styles.status}>
            <Ionicons name="footsteps" size={16} color="#F59E0B" />
            <Text style={styles.statusText}>{lastWalk}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#2563EB',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  cardContent: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  petBreed: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statusRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});