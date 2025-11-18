import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { communityAPI } from '../services/api';

export default function CommunityScreen() {
  const [communityPets, setCommunityPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCommunityFeed();
  }, []);

  const loadCommunityFeed = async () => {
    try {
      setLoading(true);
      const data = await communityAPI.getCommunityFeed();
      setCommunityPets(data);
    } catch (error) {
      console.error('Помилка завантаження спільноти:', error);
      Alert.alert('Помилка', 'Не вдалося завантажити стрічку спільноти');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCommunityFeed();
    setRefreshing(false);
  };

  const getColorForPet = (id) => {
    const colors = [
      '#F3E8FF',
      '#ECFDF5',
      '#FEF3C7',
      '#DBEAFE',
      '#FEE2E2',
      '#E0F2FE',
    ];
    return colors[id % colors.length];
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Завантаження...</Text>
      </View>
    );
  }

  const CommunityCard = ({ pet }) => (
    <View style={styles.card}>
      <View
        style={[
          styles.cardImage,
          { backgroundColor: getColorForPet(pet.id) },
        ]}
      >
        <Text style={styles.cardImageText}>{pet.name[0]}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{pet.name}</Text>
        <Text style={styles.cardBreed}>{pet.type}</Text>
        <View style={styles.ownerRow}>
          <Ionicons name="person-outline" size={14} color="#6B7280" />
          <Text style={styles.cardOwner}>
            {pet.owner?.name || 'Невідомий'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#2563EB']}
        />
      }
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Спільнота PetCare</Text>
        <Text style={styles.subtitle}>
          Дивіться улюбленців інших люблячих господарів.
        </Text>
      </View>

      {communityPets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={64} color="#D1D5DB" />
          <Text style={styles.emptyText}>Поки немає улюбленців</Text>
          <Text style={styles.emptySubtext}>
            Будьте першими, хто додасть свого улюбленця!
          </Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {communityPets.map((pet) => (
            <CommunityCard key={pet.id} pet={pet} />
          ))}
        </View>
      )}
    </ScrollView>
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
  headerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  cardContent: {
    padding: 12,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  cardBreed: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  cardOwner: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});