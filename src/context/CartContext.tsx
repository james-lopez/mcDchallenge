import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  quantity: number;
}

type CartAction = 
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'CLEAR' };

interface CartContextType {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | null>(null);

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(item => item.id === action.item.id);
      if (existing) {
        return state.map(item =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + action.item.quantity }
            : item
        );
      }
      return [...state, { ...action.item, quantity: action.item.quantity }];
    }
    case 'REMOVE':
      return state.filter(item => item.id !== action.id);
    case 'CLEAR':
      return [];
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      );
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;  // Just return the context directly
};