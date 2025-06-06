import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ToggleButton = styled.TouchableOpacity`
  padding: 8px;
`;

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton onPress={toggleTheme}>
      <Ionicons 
        name={isDarkMode ? 'sunny' : 'moon'} 
        size={24} 
        color={isDarkMode ? '#FFF' : '#000'} 
      />
    </ToggleButton>
  );
} 