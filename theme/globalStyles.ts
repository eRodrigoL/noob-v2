// globalStyles.ts
// Estilos reutilizáveis que já se adaptam ao tema e tamanho de fonte.

import { StyleSheet } from 'react-native';
import { themes } from './theme';
import { baseFontSize, fontScale } from './typography';

export const createGlobalStyles = (themeName: keyof typeof themes, fontMultiplier = 1) => {
  const theme = themes[themeName];

  return StyleSheet.create({
    screen: {
      backgroundColor: theme.background,
      flex: 1,
      padding: 16,
    },
    text: {
      color: theme.text,
      fontSize: baseFontSize * fontScale.base * fontMultiplier,
    },
    title: {
      color: theme.text,
      fontSize: baseFontSize * fontScale.giant * fontMultiplier,
      fontWeight: 'bold',
    },
  });
};
