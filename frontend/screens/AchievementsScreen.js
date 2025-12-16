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

// Макет для досягнень
const MOCK_ACHIEVEMENTS = [
  { 
    id: 1, 
    title: 'Початок шляху', 
    description: 'Додайте свого першого улюбленця.', 
    goal: 1, 
    progressKey: 'totalPets',
    icon: 'star-outline', 
    color: '#F59E0B' 
  },
  { 
    id: 2, 
    title: 'Турботливий господар', 
    description: 'Завершіть 5 подій у планувальнику.', 
    goal: 5, 
    progressKey: 'completedEvents',
    icon: 'ribbon-outline', 
    color: '#10B981' 
  },
  { 
    id: 3, 
    title: 'Велика сім\'я', 
    description: 'Додайте 3 улюбленців.', 
    goal: 3, 
    progressKey: 'totalPets',
    icon: 'people-outline', 
    color: '#2563EB' 
  },
  { 
    id: 4, 
    title: 'Планування на рік', 
    description: 'Додайте 10 майбутніх подій.', 
    goal: 10, 
    progressKey: 'upcomingEvents',
    icon: 'calendar-sharp', 
    color: '#DC2626' 
  },
];

// Компонент для відображення прогресу
const AchievementCard = ({ achievement, progress }) => {
  const currentProgress = progress[achievement.progressKey] || 0;
  const isCompleted = currentProgress >= achievement.goal;
  const progressPercentage = Math.min(100, (currentProgress / achievement.goal) * 100);

  return (
    <View style={[styles.achCard, isCompleted && styles.achCardCompleted]}>
      <View style={styles.achHeader}>
        <Ionicons 
          name={achievement.icon} 
          size={30} 
          color={isCompleted ? '#F59E0B' : achievement.color} 
        />
        <View style={styles.achTitleContainer}>
          <Text style={styles.achTitle}>{achievement.title}</Text>
          <Text style={styles.achDescription}>{achievement.description}</Text>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%`, backgroundColor: achievement.color }]} />
        <Text style={styles.progressText}>
            {isCompleted ? 'Виконано!' : `${currentProgress} / ${achievement.goal}`}
        </Text>
      </View>
      
      {isCompleted && (
          <Ionicons name="medal" size={20} color="#F59E0B" style={styles.badge} />
      )}
    </View>
  );
};

export default function AchievementsScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({
    totalPets: 0,
    upcomingEvents: 0,
    completedEvents: 0,
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      
      const pets = await petsAPI.getAllPets();
      const totalPets = pets.length;

      let upcomingCount = 0;
      let completedCount = 0;

      for (const pet of pets) {
        const events = await eventsAPI.getEventsForPet(pet.id);
        const now = new Date();
        events.forEach(event => {
          if (event.checked) {
            completedCount++;
          } else if (new Date(event.date) >= now) {
            upcomingCount++;
          }
        });
      }
      
      setProgress({
        totalPets: totalPets,
        upcomingEvents: upcomingCount,
        completedEvents: completedCount,
      });

    } catch (error) {
      console.error('Помилка завантаження прогресу:', error);
      Alert.alert('Помилка', 'Не вдалося завантажити дані прогресу.');
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
            <Text style={styles.pageTitle}>Ваші Досягнення</Text>
            <Text style={styles.subtitle}>Виконуйте завдання та отримуйте нагороди за турботу про улюбленців.</Text>
        </View>

        <View style={styles.achievementList}>
            {MOCK_ACHIEVEMENTS.map(ach => (
                <AchievementCard key={ach.id} achievement={ach} progress={progress} />
            ))}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    marginBottom: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  achievementList: {
    gap: 12,
  },
  achCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#E5E7EB',
    position: 'relative',
  },
  achCardCompleted: {
    borderLeftColor: '#10B981', 
    backgroundColor: '#F0FFF4',
  },
  achHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  achTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  achTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  achDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    position: 'absolute',
    top: -20,
    right: 0,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  badge: {
      position: 'absolute',
      top: 10,
      right: 10,
  }
});