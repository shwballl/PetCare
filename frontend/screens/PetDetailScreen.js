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
import { petsAPI, eventsAPI } from '../services/api';

export default function PetDetailScreen({ route, navigation }) {
  const { petId } = route.params;
  const [pet, setPet] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPetDetails();
  }, [petId]);

  // Перезавантаження при поверненні на екран
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPetDetails();
    });
    return unsubscribe;
  }, [navigation, petId]);

  const loadPetDetails = async () => {
    try {
      setLoading(true);
      const petData = await petsAPI.getPetById(petId);
      const eventsData = await eventsAPI.getEventsForPet(petId);
      setPet(petData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Помилка завантаження:', error);
      Alert.alert('Помилка', 'Не вдалося завантажити дані улюбленця');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePet = () => {
    Alert.alert(
      'Видалити улюбленця',
      `Ви впевнені, що хочете видалити ${pet.name}?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              await petsAPI.deletePet(petId);
              Alert.alert('Успіх', 'Улюбленця видалено');
              navigation.goBack();
            } catch (error) {
              console.error('Помилка видалення:', error);
              Alert.alert('Помилка', 'Не вдалося видалити улюбленця');
            }
          },
        },
      ]
    );
  };

  const handleDeleteEvent = (eventId) => {
    Alert.alert(
      'Видалити подію',
      'Ви впевнені, що хочете видалити цю подію?',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              await eventsAPI.deleteEvent(eventId);
              Alert.alert('Успіх', 'Подію видалено');
              loadPetDetails();
            } catch (error) {
              console.error('Помилка видалення:', error);
              Alert.alert('Помилка', 'Не вдалося видалити подію');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Завантаження...</Text>
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Улюбленця не знайдено</Text>
      </View>
    );
  }

  const getColorForPet = (id) => {
    const colors = [
      '#E0F2FE',
      '#FFFBEB',
      '#F3E8FF',
      '#ECFDF5',
      '#FEF3C7',
      '#DBEAFE',
    ];
    return colors[id % colors.length];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: getColorForPet(pet.id) },
          ]}
        >
          <Text style={styles.avatarText}>{pet.name[0]}</Text>
        </View>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.breed}>{pet.type}</Text>
        <Text style={styles.birthDate}>
          Дата народження:{' '}
          {new Date(pet.birthDate).toLocaleDateString('uk-UA')}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Планувальник</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddEvent', { petId: pet.id })
            }
          >
            <Ionicons name="add-circle" size={28} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {events.length === 0 ? (
          <View style={styles.emptyEvents}>
            <Ionicons name="calendar-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>Поки немає подій</Text>
          </View>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={() => handleDeleteEvent(event.id)}
            />
          ))
        )}
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeletePet}
      >
        <Ionicons name="trash-outline" size={20} color="#DC2626" />
        <Text style={styles.deleteText}>Видалити улюбленця</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function EventCard({ event, onDelete }) {
  const getEventIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('вакцин')) return 'medical';
    if (lowerName.includes('ветеринар')) return 'heart';
    if (lowerName.includes('стрижка')) return 'cut';
    return 'calendar';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.eventCard}>
      <View style={styles.eventIcon}>
        <Ionicons
          name={getEventIcon(event.name)}
          size={24}
          color="#2563EB"
        />
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.name}</Text>
        <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
        {event.details && (
          <Text style={styles.eventDetails}>{event.details}</Text>
        )}
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash-outline" size={20} color="#DC2626" />
      </TouchableOpacity>
    </View>
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
  birthDate: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  emptyEvents: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  eventIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
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
  eventDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
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