import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MyPetsScreen from '../screens/MyPetsScreen';
import PetDetailScreen from '../screens/PetDetailScreen';
import AddPetScreen from '../screens/AddPetScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'MyPets') {
            iconName = 'home';
          } else if (route.name === 'Community') {
            iconName = 'people';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#2563EB',
      })}
    >
      <Tab.Screen 
        name="MyPets" 
        component={MyPetsScreen}
        options={{ 
          title: 'PetCare',
          tabBarLabel: 'Головна'
        }}
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen}
        options={{ 
          title: 'Спільнота',
          tabBarLabel: 'Спільнота'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Мій Профіль',
          tabBarLabel: 'Профіль'
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainApp" component={MainTabs} />
      <Stack.Screen 
        name="PetDetail" 
        component={PetDetailScreen}
        options={{ headerShown: true, title: 'Деталі улюбленця' }}
      />
      <Stack.Screen 
        name="AddPet" 
        component={AddPetScreen}
        options={{ headerShown: true, title: 'Новий улюбленець' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ headerShown: true, title: 'Налаштування' }}
      />
    </Stack.Navigator>
  );
}