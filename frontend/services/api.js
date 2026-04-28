import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Налаштування API
// ⚠️ Переконайтеся, що IP-адреса правильна для вашої мережі
// Replace the hardcoded IP with this:
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.1:3000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // Increased slightly for tunnel stability
  headers: {
    "Content-Type": "application/json",
  },
});

// Ключ для збереження токену
const TOKEN_KEY = "auth_token";

// ============================================
// Функції для роботи з токеном
// ============================================

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Помилка збереження токену:", error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Помилка отримання токену:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Помилка видалення токену:", error);
  }
};

// ============================================
// Interceptors
// ============================================

// Додаємо токен до кожного запиту
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Обробка помилок (автоматичний вихід при 401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await removeToken();
      // Тут можна додати логіку глобальної навігації на логін, якщо потрібно
    }
    return Promise.reject(error);
  },
);

// ============================================
// AUTH API - Автентифікація
// ============================================

export const authAPI = {
  // Вхід в систему
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.token) {
        await saveToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Реєстрація
  register: async (email, password, username, name) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        username,
        name,
      });
      if (response.data.token) {
        await saveToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Вихід з системи
  logout: async () => {
    await removeToken();
  },
};

// ============================================
// USER API - Користувачі
// ============================================

export const userAPI = {
  // Отримати профіль поточного користувача
  // Використовуйте цю функцію в ProfileScreen
  getProfile: async () => {
    try {
      const response = await api.get("/users/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Оновити профіль
  // data — це об'єкт, наприклад: { name: "Нове ім'я" }
  updateProfile: async (data) => {
    try {
      // 🛠️ ВИПРАВЛЕНО: Використовуємо PUT замість POST
      const response = await api.put("/users/me", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// ============================================
// PETS API - Улюбленці
// ============================================

export const petsAPI = {
  // Отримати всіх улюбленців користувача
  getAllPets: async () => {
    try {
      const response = await api.get("/pets");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Отримати улюбленця за ID
  getPetById: async (petId) => {
    try {
      const response = await api.get(`/pets/${petId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  uploadPhoto: async (formData) => {
    try {
      const response = await api.post("/pets/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // поверне { url: '/uploads/filename.jpg' }
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  addPet: async (name, type, birthDate, photoUrl) => {
    // Додали photoUrl
    try {
      const response = await api.post("/pets", {
        name,
        type,
        birthDate,
        photoUrl,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Оновити улюбленця
  updatePet: async (petId, name, type, birthDate) => {
    try {
      const response = await api.put(`/pets/${petId}`, {
        name,
        type,
        birthDate,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Видалити улюбленця
  deletePet: async (petId) => {
    try {
      const response = await api.delete(`/pets/${petId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// ============================================
// EVENTS API - Події
// ============================================

export const eventsAPI = {
  // Отримати події для улюбленця
  getEventsForPet: async (petId) => {
    try {
      const response = await api.get(`/events/${petId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Додати нову подію
  addEvent: async (name, date, checked, details, petId) => {
    try {
      const response = await api.post("/events", {
        name,
        date,
        checked,
        details,
        petId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Оновити подію
  updateEvent: async (eventId, name, date, details) => {
    try {
      const response = await api.put(`/events/${eventId}`, {
        name,
        date,
        details,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Видалити подію
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// ============================================
// COMMUNITY API - Спільнота
// ============================================

export const communityAPI = {
  // Отримати стрічку спільноти
  getCommunityFeed: async () => {
    try {
      const response = await api.get("/community/feed");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Експортуємо axios instance для можливості додаткових запитів
export default api;
