import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function CommunityScreen() {
  const CommunityCard = ({ name, owner, color }) => (
    <View style={styles.card}>
      <View style={[styles.cardImage, { backgroundColor: color }]}>
        <Text style={styles.cardImageText}>{name[0]}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardOwner}>Господар: {owner}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Спільнота PetCare</Text>
      <Text style={styles.subtitle}>
        Дивіться улюбленців інших люблячих господарів.
      </Text>

      <View style={styles.grid}>
        <CommunityCard name="Луна" owner="@anna_k" color="#F3E8FF" />
        <CommunityCard name="Чарлі" owner="@mike_p" color="#ECFDF5" />
        <CommunityCard name="Дейзі" owner="@elena_v" color="#FEF3C7" />
        <CommunityCard name="Бадді" owner="@alex_r" color="#DBEAFE" />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  cardOwner: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});