import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Сповіщення</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Push-сповіщення</Text>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={pushNotifications ? '#2563EB' : '#F3F4F6'}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email-розсилка</Text>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={emailNotifications ? '#2563EB' : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Оформлення</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Темна тема</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={darkMode ? '#2563EB' : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Мова</Text>
        
        <View style={styles.languageOption}>
          <Text style={styles.languageText}>Українська 🇺🇦</Text>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#374151',
  },
  languageOption: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  languageText: {
    fontSize: 16,
    color: '#374151',
  },
});