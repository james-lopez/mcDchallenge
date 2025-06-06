import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import CartIconWithBadge from '../components/CartIconWithBadge';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.headerText
          },
          headerRight: () => <CartIconWithBadge />,
          headerTitleAlign: 'left'
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerLeft: () => <ThemeToggle />,
            headerLeftContainerStyle: {
              paddingLeft: 16
            }
          }}
        />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}