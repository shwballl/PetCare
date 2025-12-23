import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const originalConsoleError = console.error;

console.error = (...args) => {
  if (typeof args[0] === 'string' && (args[0].includes('Network Error') || args[0].includes('Axios'))) {
     return;
  }
  
  originalConsoleError(...args);
};
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}