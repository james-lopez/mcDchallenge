import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types/navigation';
import { formatPrice } from '../utils/price';
import { useTheme } from '../context/ThemeContext';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 16px;
`;

const Card = styled.View`
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  elevation: 2;
`;

const BurgerImage = styled.Image`
  width: 100%;
  height: 100px;
  border-radius: 8px;
`;

const Name = styled.Text`
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

const Price = styled.Text`
  font-size: 14px;
  color: #666;
`;

export default function HomeScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();

  useEffect(() => {
    fetch('https://burgerhub00.github.io/data/products.json')
      .then(res => res.json())
      .then(json => setMenuItems(json.products))
      .catch(console.error);
  }, []);

  return (
    <Container theme={{ colors }}>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
            <Card>
              <BurgerImage source={{ uri: item.image }} />
              <Name>{item.name}</Name>
              <Price>{formatPrice(item.price)}</Price>
            </Card>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}