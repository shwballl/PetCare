import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { userAPI } from '../services/api'; // userAPI використовується для оновлення профілю

export default function EditProfileScreen({ route, navigation }) {
  // Отримуємо початкові дані користувача, передані з ProfileScreen
  const initialUser = route.params?.user; 

  const [name, setName] = useState(initialUser?.name || '');
  const [username, setUsername] = useState(initialUser?.username || '');
  const [email, setEmail] = useState(initialUser?.email || ''); // Email може бути лише для відображення
  
  const [isSaving, setIsSaving] = useState(false);
  
  // Припускаємо, що email і username не редагуються, як у вашому бекенд контролері,
  // але ми їх відображаємо. 
  // У вашому UsersController зараз дозволено оновлювати лише 'name'.

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Помилка', 'Ім\'я не може бути порожнім.');
      return;
    }

    setIsSaving(true);
    try {
      // ❗ Примітка: Виклик API повинен відповідати вашому контролеру:
      // PUT /users/me приймає тільки name.
      await userAPI.updateProfile({ name }); 
      
      Alert.alert('Успіх', 'Профіль успішно оновлено!');
      
      // Повернення на ProfileScreen і оновлення даних
      // Ми повертаємось і примушуємо ProfileScreen оновити дані 
      // через listener, який ми додамо в пункті 3.
      navigation.goBack(); 
      
    } catch (error) {
      console.error('Помилка оновлення профілю:', error);
      const errorMessage = error.message || 'Не вдалося зберегти зміни.';
      Alert.alert('Помилка', errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Редагування профілю</Text>

        {/* Ім'я */}
        <Text style={styles.label}>Ім'я</Text>
        <TextInput
          style={styles.input}
          placeholder="Введіть ваше ім'я"
          value={name}
          onChangeText={setName}
        />
        
        {/* Email (тільки для відображення) */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={email}
          editable={false} // Зазвичай email не редагується тут
        />

        {/* Username (тільки для відображення) */}
        <Text style={styles.label}>Нікнейм (Username)</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={username}
          editable={false} // Зазвичай username не редагується тут
        />

        {/* Кнопка Зберегти */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveProfile}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Зберегти зміни</Text>
          )}
        </TouchableOpacity>
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
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#1F2937',
  },
  disabledInput: {
    backgroundColor: '#E5E7EB',
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});