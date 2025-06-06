// components/CartIconWithBadge.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

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

export default function CartIconWithBadge() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={{ marginRight: 16 }}
    >
      <View>
        <Ionicons name="cart" size={24} color="black" />
        {totalQty > 0 && (
          <Badge>
            <BadgeText>{totalQty}</BadgeText>
          </Badge>
        )}
      </View>
    </TouchableOpacity>
  );
}
