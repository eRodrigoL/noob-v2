// useTheme.ts
// Hook para acesso direto ao tema e tipografia com base no estado global.

import { useSettingsStore } from '@store/useSettingsStore';
import { themes } from '@theme/theme';
import { baseFontSize, fontScale, fontFamilies } from '@theme/typography';

export const useTheme = () => {
  const { theme, fontMultiplier } = useSettingsStore();

  const currentTheme = themes[theme];

  return {
    colors: currentTheme,
    fontSizes: {
      small: baseFontSize * fontScale.small * fontMultiplier,
      base: baseFontSize * fontScale.base * fontMultiplier,
      large: baseFontSize * fontScale.large * fontMultiplier,
      giant: baseFontSize * fontScale.giant * fontMultiplier,
    },
    fontFamilies,
    themeName: theme,
    fontMultiplier,
  };
};
