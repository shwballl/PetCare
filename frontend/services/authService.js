import api, { saveToken, removeToken } from './api';

export const authService = {
  // Логін
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Зберігаємо токен
      await saveToken(token);
      
      return { success: true, user };
    } catch (error) {
      console.error('Помилка логіну:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Помилка входу' 
      };
    }
  },

  // Реєстрація
  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      await saveToken(token);
      
      return { success: true, user };
    } catch (error) {
      console.error('Помилка реєстрації:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Помилка реєстрації' 
      };
    }
  },

  // Вихід
  logout: async () => {
    try {
      await api.post('/auth/logout');
      await removeToken();
      return { success: true };
    } catch (error) {
      console.error('Помилка виходу:', error);
      await removeToken(); // Видаляємо токен навіть якщо запит не вдався
      return { success: true };
    }
  },

  // Перевірка токену
  checkAuth: async () => {
    try {
      const response = await api.get('/auth/me');
      return { success: true, user: response.data };
    } catch (error) {
      return { success: false };
    }
  },
};