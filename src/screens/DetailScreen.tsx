import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types/navigation';
import { useCart } from '../context/CartContext';

const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
`;

const Price = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Button = styled.TouchableOpacity`
  background-color: #f04e23;
  padding: 12px;
  border-radius: 6px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export default function DetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  
  if (!route.params?.item) {
    return null;
  }
  
  const { item } = route.params;
  const { dispatch } = useCart();

  const handleAddToCart = (item: MenuItem) => {
    dispatch({ type: 'ADD', item: { ...item, quantity: 1 } });
    Alert.alert(
      'Success',
      `Added ${item.name} to cart`,
      [
        {
          text: 'OK',
          onPress: () => navigation.popToTop()
        }
      ]
    );
  };

  return (
    <Container>
      <ProductImage source={{ uri: item.image }} />
      <Title>{item.name}</Title>
      <Price>${item.price}</Price>
      <Description>{item.description}</Description>
      <Button onPress={() => handleAddToCart(item)}>
        <ButtonText>Add to Cart</ButtonText>
      </Button>
    </Container>
  );
}