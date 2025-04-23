// store/useSettingsStore.ts
// Gerencia configurações visuais do app (tema, tamanho da fonte) com Zustand + persistência local.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeType } from '@theme/theme';

type SettingsState = {
  theme: ThemeType;
  fontMultiplier: number;
  // setTheme: (theme: ThemeType) => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontMultiplier: 1,

      setTheme: (theme: ThemeType) => set({ theme }),

      increaseFont: () =>
        set((state: SettingsState) => ({
          fontMultiplier: Math.min(state.fontMultiplier + 0.125, 1.5),
        })),

      decreaseFont: () =>
        set((state: SettingsState) => ({
          fontMultiplier: Math.max(state.fontMultiplier - 0.125, 0.75),
        })),

      resetSettings: () => set({ theme: 'light', fontMultiplier: 1 }),
    }),
    {
      name: 'user-settings-storage', // nome da chave no AsyncStorage
    },
  ),
);
