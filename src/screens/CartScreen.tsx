import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components/native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import CartItem from '../components/CartItem';
import { formatPrice } from '../utils/price';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 16px;
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

  const handleRemoveItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id });
  }, [dispatch]);

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
    } else {
      handleRemoveItem(id);
    }
  }, [dispatch, handleRemoveItem]);

  const handleClearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, [dispatch]);

  const total = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [cart]
  );

  return (
    <Container>
      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveItem}
        />
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