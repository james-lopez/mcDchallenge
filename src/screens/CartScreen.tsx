import React from 'react';
import styled from 'styled-components/native';
import { FlatList, Alert } from 'react-native';
import { useCart } from '../context/CartContext';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ItemCard = styled.View`
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #fafafa;
`;

const ItemName = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const ItemPrice = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 4px;
`;

const RemoveButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #f04e23;
  padding: 8px 12px;
  border-radius: 4px;
  align-self: flex-start;
`;

const RemoveText = styled.Text`
  color: white;
  font-weight: bold;
`;

const Total = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

export default function CartScreen() {
  const { cart, dispatch } = useCart();

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE', id });
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container>
      <Title>Your Cart</Title>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>${item.price}</ItemPrice>
            <RemoveButton onPress={() => handleRemove(item.id)}>
              <RemoveText>Remove</RemoveText>
            </RemoveButton>
          </ItemCard>
        )}
      />
      <Total>Total: ${total.toFixed(2)}</Total>
    </Container>
  );
}
