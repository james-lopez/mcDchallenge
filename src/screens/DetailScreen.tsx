import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types/navigation';
import { useCart } from '../context/CartContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

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

const Nutrients = styled.Text`
  font-size: 14px;
  color: #888;
  margin-bottom: 16px;
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


export default function DetailScreen({ route, navigation }: Props) {
  const { item } = route.params;
  const { dispatch } = useCart();

  const handleAddToCart = (item: MenuItem) => {
    dispatch({ type: 'ADD', item });
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
      <Nutrients>Nutritional Info: {item.nutritional_info}</Nutrients>
      <Button onPress={() => handleAddToCart(item)}>
        <ButtonText>Add to Cart</ButtonText>
      </Button>
    </Container>
  );
}