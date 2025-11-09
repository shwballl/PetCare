import axios from 'axios';

// Замініть на адресу вашого бекенду
const API_URL = 'http://localhost:3000/api'; // Для розробки
// const API_URL = 'https://your-backend.com/api'; // Для продакшну

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для додавання токену до кожного запиту
api.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Отримуємо токен з AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor для обробки помилок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Токен невалідний, перенаправляємо на логін
      await removeToken();
      // Тут можна додати навігацію до екрану логіну
    }
    return Promise.reject(error);
  }
);

// Функції для роботи з токеном
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Помилка збереження токену:', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Помилка отримання токену:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Помилка видалення токену:', error);
  }
};

export default api;