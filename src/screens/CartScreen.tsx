import React from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/price';
import { useTheme } from '../context/ThemeContext';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 16px;
`;

const CartItemContainer = styled.View`
  margin-bottom: 24px;
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  padding: 16px;
`;

const ItemRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const ItemImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

const ItemDetails = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const ItemName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${props => props.theme.colors.text};
`;

const QuantityText = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
`;

const PriceText = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
`;

const SubtotalText = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  margin-top: 8px;
`;

const QuantityControls = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;

const QuantityButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.secondary};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
`;

const QuantityButtonText = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const RemoveButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.error};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 8px;
`;

const RemoveText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const TotalContainer = styled.View`
  padding: 16px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.border};
  align-items: center;
`;

const TotalText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 16px;
`;

const ClearCartButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.secondary};
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  align-items: center;
`;

const ClearCartText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export default function CartScreen() {
  const { cart, dispatch } = useCart();
  const { colors } = useTheme();

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE', id });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
    } else {
      handleRemoveItem(id);
    }
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Container theme={{ colors }}>
      {cart.map(item => (
        <CartItemContainer key={item.id}>
          <ItemRow>
            <ItemImage source={{ uri: item.image }} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <QuantityText>Quantity: {item.quantity}</QuantityText>
              <PriceText>Price: {formatPrice(item.price)}</PriceText>
            </ItemDetails>
          </ItemRow>
          <QuantityControls>
            <QuantityButton onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
              <QuantityButtonText>-</QuantityButtonText>
            </QuantityButton>
            <QuantityButton onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
              <QuantityButtonText>+</QuantityButtonText>
            </QuantityButton>
          </QuantityControls>
          <SubtotalText>Subtotal: {formatPrice(item.price * item.quantity)}</SubtotalText>
          <RemoveButton onPress={() => handleRemoveItem(item.id)}>
            <RemoveText>Remove</RemoveText>
          </RemoveButton>
        </CartItemContainer>
      ))}
      
      <TotalContainer>
        <TotalText>Total: {formatPrice(total)}</TotalText>
        <ClearCartButton onPress={handleClearCart}>
          <ClearCartText>Clear Cart</ClearCartText>
        </ClearCartButton>
      </TotalContainer>
    </Container>
  );
}