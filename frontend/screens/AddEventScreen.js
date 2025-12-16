import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { eventsAPI } from '../services/api';

export default function AddEventScreen({ route, navigation }) {
  // Отримуємо petId з параметрів маршруту
  const { petId } = route.params; 

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [details, setDetails] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleAddEvent = async () => {
    if (!name.trim() || !date || !petId) {
      Alert.alert('Помилка', 'Будь ласка, заповніть назву та дату події.');
      return;
    }

    setLoading(true);
    try {
      // API викликається згідно з eventsAPI в api.js
      await eventsAPI.addEvent(
        name,
        date.toISOString(), // Передаємо дату в форматі ISO
        false, // checked завжди false при створенні
        details,
        petId
      );
      
      Alert.alert('Успіх', 'Подію успішно додано!');
      
      // Повернення на попередній екран (PetDetailScreen)
      navigation.goBack(); 
    } catch (error) {
      console.error('Помилка додавання події:', error);
      Alert.alert('Помилка', 'Не вдалося додати подію. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Додати нову подію</Text>
        
        {/* Поле Назва */}
        <Text style={styles.label}>Назва події</Text>
        <TextInput
          style={styles.input}
          placeholder="Наприклад: Вакцинація, Грумінг, Візит до лікаря"
          value={name}
          onChangeText={setName}
        />
        
        {/* Поле Дата та Час */}
        <Text style={styles.label}>Дата та час</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
            <Ionicons name="calendar-outline" size={20} color="#2563EB" />
            <Text style={styles.dateText}>
                {date.toLocaleString('uk-UA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()} // Не дозволяємо додавати події в минулому
          />
        )}
        
        {/* Поле Деталі */}
        <Text style={styles.label}>Деталі (не обов'язково)</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Додаткові примітки (наприклад, назва вакцини, адреса клініки)"
          value={details}
          onChangeText={setDetails}
          multiline
        />

        {/* Кнопка Додати */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddEvent}
          disabled={loading}
        >
          <Text style={styles.addButtonText}>
            {loading ? 'Збереження...' : 'Додати в планувальник'}
          </Text>
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
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  dateText: {
    fontSize: 16,
    color: '#1E40AF',
    marginLeft: 10,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});