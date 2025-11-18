import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { petsAPI } from '../services/api';

export default function AddPetScreen({ navigation }) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [dob, setDob] = useState('');

  const handleAddPet = async () => {
    try {
      await petsAPI.addPet(name, breed, dob);
      Alert.alert('Успіх', 'Улюбленця додано!');
      navigation.goBack();
    } catch (error) {
      console.error('Помилка додавання:', error);
      Alert.alert('Помилка', 'Не вдалося додати улюбленця');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.photoButton}>
        <Ionicons name="camera" size={32} color="#6B7280" />
        <Text style={styles.photoText}>Додати фото</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ім'я улюбленця</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Наприклад, Барсик"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Порода</Text>
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={setBreed}
            placeholder="Наприклад, Шотландський висловухий"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Дата народження</Text>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDob}
            placeholder="ДД.ММ.РРРР"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddPet}>
          <Text style={styles.buttonText}>Додати улюбленця</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  photoButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 24,
  },
  photoText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});