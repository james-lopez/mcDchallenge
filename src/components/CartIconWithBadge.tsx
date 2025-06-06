import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';

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

export default function CartIconWithBadge() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart } = useCart();
  const { isDarkMode } = useTheme();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <IconContainer onPress={() => navigation.navigate('Cart')}>
      <IconWrapper>
        <Ionicons 
          name="cart" 
          size={24} 
          color={isDarkMode ? '#FFFFFF' : '#000000'} 
        />
        {totalQty > 0 && (
          <Badge>
            <BadgeText>{totalQty}</BadgeText>
          </Badge>
        )}
      </IconWrapper>
    </IconContainer>
  );
}
