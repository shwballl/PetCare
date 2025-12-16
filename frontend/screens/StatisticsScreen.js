import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { petsAPI, eventsAPI } from '../services/api';

// Компонент для однієї статистичної картки
const StatCard = ({ icon, title, value, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

export default function StatisticsScreen() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPets: 0,
    upcomingEvents: 0,
    completedEvents: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      // 1. Отримати всіх улюбленців користувача
      const pets = await petsAPI.getAllPets();
      const totalPets = pets.length;

      let upcomingCount = 0;
      let completedCount = 0;

      // 2. Отримати всі події для кожного улюбленця
      for (const pet of pets) {
        // Припускаємо, що getEventsForPet повертає події для одного petId
        const events = await eventsAPI.getEventsForPet(pet.id);
        
        // Підрахунок завершених та майбутніх
        const now = new Date();
        events.forEach(event => {
          if (event.checked) {
            completedCount++;
          } else if (new Date(event.date) >= now) {
            upcomingCount++;
          }
        });
      }
      
      setStats({
        totalPets: totalPets,
        upcomingEvents: upcomingCount,
        completedEvents: completedCount,
      });

    } catch (error) {
      console.error('Помилка завантаження статистики:', error);
      Alert.alert('Помилка', 'Не вдалося завантажити статистику.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Ваша статистика</Text>
      </View>
      
      <View style={styles.statsGrid}>
        <StatCard
          icon="paw-outline"
          title="Улюбленців"
          value={stats.totalPets}
          color="#2563EB"
        />
        <StatCard
          icon="checkmark-done-circle-outline"
          title="Завершених подій"
          value={stats.completedEvents}
          color="#10B981"
        />
        <StatCard
          icon="calendar-outline"
          title="Майбутніх подій"
          value={stats.upcomingEvents}
          color="#F59E0B"
        />
        {/* Можна додати інші показники: наприклад, "Дні у додатку" */}
      </View>
      
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Розподіл подій</Text>
        {/* Тут має бути місце для графіка (наприклад, Pie Chart) 
         */}
        <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Графік розподілу подій (наприклад, вакцинація, візити)</Text>
        </View>
      </View>

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
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    width: '48%', 
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  placeholder: {
      height: 200,
      backgroundColor: '#F3F4F6',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  placeholderText: {
      color: '#9CA3AF',
  }
});