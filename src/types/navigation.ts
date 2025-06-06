export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  nutritional_info?: string;
  quantity: number;
  calorie: number;
}

export type RootStackParamList = {
  Home: undefined;
  Details: { item: MenuItem };
  Cart: undefined;
}; 