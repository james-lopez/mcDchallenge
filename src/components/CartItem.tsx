import React, { memo } from 'react';
import styled from 'styled-components/native';
import { MenuItem } from '../types/navigation';
import { formatPrice } from '../utils/price';
import { useTheme } from '../context/ThemeContext';

const ItemContainer = styled.View`
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

type CartItemType = Omit<MenuItem, 'nutritional_info'>;

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = memo(({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityDecrease = () => {
    onUpdateQuantity(item.id, item.quantity - 1);
  };

  const handleQuantityIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <ItemContainer>
      <ItemRow>
        <ItemImage source={{ uri: item.image }} />
        <ItemDetails>
          <ItemName>{item.name}</ItemName>
          <QuantityText>Quantity: {item.quantity}</QuantityText>
          <PriceText>Price: {formatPrice(item.price)}</PriceText>
        </ItemDetails>
      </ItemRow>
      <QuantityControls>
        <QuantityButton onPress={handleQuantityDecrease}>
          <QuantityButtonText>-</QuantityButtonText>
        </QuantityButton>
        <QuantityButton onPress={handleQuantityIncrease}>
          <QuantityButtonText>+</QuantityButtonText>
        </QuantityButton>
      </QuantityControls>
      <SubtotalText>
        Subtotal: {formatPrice(item.price * item.quantity)}
      </SubtotalText>
      <RemoveButton onPress={() => onRemove(item.id)}>
        <RemoveText>Remove</RemoveText>
      </RemoveButton>
    </ItemContainer>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;
