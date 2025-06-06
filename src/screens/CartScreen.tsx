import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types/navigation';

export default function CartScreen() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: { item: MenuItem }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Remove" onPress={() => dispatch({ type: 'REMOVE', id: item.id })} />
          </View>
        )}
      />
      <Text>Total: ${total.toFixed(2)}</Text>
    </View>
  );
}