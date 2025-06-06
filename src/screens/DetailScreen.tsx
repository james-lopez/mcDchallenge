import React from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { item } = route.params;

  const handleAddToCart = () => {
    Alert.alert(`Added ${item.name} to cart`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Text>{item.description}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}