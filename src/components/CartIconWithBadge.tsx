import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native';

const Badge = styled.View`
  position: absolute;
  right: -6px;
  top: -4px;
  background-color: red;
  border-radius: 10px;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

const IconContainer = styled.TouchableOpacity`
`;

const IconWrapper = styled.View`
  position: relative;
`;

const CartIconWithBadge = () => {
  const { cart } = useCart();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Cart')}
      testID="cart-icon"
    >
      <Ionicons 
        name="cart-outline" 
        size={24} 
        color={theme.colors.text}
      />
      {cart.length > 0 && (
        <Badge testID="cart-badge">
          <BadgeText>{cart.length}</BadgeText>
        </Badge>
      )}
    </TouchableOpacity>
  );
};

export default CartIconWithBadge;
