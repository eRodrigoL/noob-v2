// Importa o hook personalizado useSettingsStore do arquivo de configurações
import { useSettingsStore } from '@store/useSettingsStore';
import theme from '@theme/global/theme'; // Importa as definições de tema (cores) do arquivo theme.ts
import typography from '@theme/global/typography'; // Importa as definições de tipografia do arquivo typography.ts

// Hook personalizado que fornece tema e tipografia atualizados globalmente
export const useTheme = () => {
  // Obtém configurações globais do Zustand
  const { fontFamily, fontSizeMultiplier, colorScheme } = useSettingsStore();

  // Define cores com base no tema selecionado (light, dark ou daltonic)
  const colors = theme[colorScheme];

  // Calcula tamanhos de fonte aplicando os multiplicadores e limites
  const base = typography.sizes.base * fontSizeMultiplier;
  const fontSizes = {
    small: Math.max(typography.sizes.min, base * typography.sizes.smallMultiplier),
    base: base,
    large: Math.min(typography.sizes.max, base * typography.sizes.largeMultiplier),
    giant: Math.min(typography.sizes.max, base * typography.sizes.giantMultiplier),
  };

  return {
    colors, // Paleta de cores do tema selecionado
    fontFamily, // Família da fonte escolhida pelo usuário
    fontSizes, // Tamanhos de fonte ajustados dinamicamente
  };
};
