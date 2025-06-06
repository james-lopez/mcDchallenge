import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

const CartButton = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
        <Ionicons name="cart" size={20} color="black" />
      </TouchableOpacity>
    );
  };

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
                title: 'Home',
                headerRight: () => (<CartButton />)
            })}
        />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}