import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </SafeAreaProvider>
  );
}
