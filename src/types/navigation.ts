export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export type RootStackParamList = {
  Home: undefined;
  Details: { item: MenuItem };
  Cart: undefined;
}; 