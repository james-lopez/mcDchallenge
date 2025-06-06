import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

type CartAction = 
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string };

interface CartContextType {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | null>(null);

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.item];
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};