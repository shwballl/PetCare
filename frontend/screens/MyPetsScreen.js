import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { petsAPI } from '../services/api';

export default function MyPetsScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadPets();
  }, []);

  // Перезавантаження при поверненні на екран
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPets();
    });
    return unsubscribe;
  }, [navigation]);

  const loadPets = async () => {
    try {
      setLoading(true);
      const data = await petsAPI.getAllPets();
      setPets(data);
    } catch (error) {
      console.error('Помилка завантаження:', error);
      Alert.alert('Помилка', 'Не вдалося завантажити улюбленців');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Завантаження...</Text>
      </View>
    );
  }

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

      {pets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="paw-outline" size={64} color="#D1D5DB" />
          <Text style={styles.emptyText}>Поки немає улюбленців</Text>
          <Text style={styles.emptySubtext}>
            Додайте свого першого улюбленця!
          </Text>
        </View>
      ) : (
        pets.map((pet) => (
          <PetCard
            key={pet.id}
            id={pet.id}
            name={pet.name}
            breed={pet.type}
            birthDate={pet.birthDate}
            color={getColorForPet(pet.id)}
            onPress={() =>
              navigation.navigate('PetDetail', { petId: pet.id })
            }
          />
        ))
      )}
    </ScrollView>
  );
}

// Функція для генерації кольорів
function getColorForPet(id) {
  const colors = [
    '#E0F2FE',
    '#FFFBEB',
    '#F3E8FF',
    '#ECFDF5',
    '#FEF3C7',
    '#DBEAFE',
  ];
  return colors[id % colors.length];
}

function PetCard({ id, name, breed, birthDate, color, onPress }) {
  // Розрахунок віку
  const calculateAge = (birthDate) => {
    if (!birthDate) return 'Не вказано';
    const birth = new Date(birthDate);
    const now = new Date();
    const years = now.getFullYear() - birth.getFullYear();
    const months = now.getMonth() - birth.getMonth();
    
    if (years > 0) {
      return `${years} ${years === 1 ? 'рік' : years < 5 ? 'роки' : 'років'}`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? 'місяць' : months < 5 ? 'місяці' : 'місяців'}`;
    } else {
      return 'Менше місяця';
    }
  };

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
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.statusText}>{calculateAge(birthDate)}</Text>
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
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