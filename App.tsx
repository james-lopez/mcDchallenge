import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { ThemeProvider as CustomThemeProvider } from './src/context/ThemeContext';
import { useTheme } from './src/context/ThemeContext';

function ThemedApp() {
  const { colors } = useTheme();
  return (
    <StyledThemeProvider theme={{ colors }}>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </StyledThemeProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <ThemedApp />
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
}
