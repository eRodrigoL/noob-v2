// store/useSettingsStore.ts

// Importa a função create do Zustand para criar o store
import { create } from 'zustand';
// Importa AsyncStorage para persistência de dados
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define o tipo para o estado e as ações do store de configurações
type SettingsState = {
  colorScheme: 'light' | 'dark' | 'daltonic'; // Paleta de cores escolhida
  fontFamily: string; // Nome da fonte atual
  fontSizeMultiplier: number; // Multiplicador do tamanho base da fonte
  isLoaded: boolean; // Indica se as configurações foram carregadas
  decreaseFontSize: () => void; // Diminui o tamanho da fonte
  increaseFontSize: () => void; // Aumenta o tamanho da fonte
  loadSettings: () => Promise<void>; // Carrega as configurações do AsyncStorage
  restoreDefaults: () => void; // Restaura configurações padrão
  // eslint-disable-next-line no-unused-vars
  setColorScheme: (scheme: 'light' | 'dark' | 'daltonic') => void; // Define a paleta de cores
  // eslint-disable-next-line no-unused-vars
  setFontFamily: (fontFamily: string) => void; // Define a família da fonte
};

// Cria e exporta o hook useSettingsStore usando Zustand
export const useSettingsStore = create<SettingsState>((set, get) => ({
  // Estado inicial
  colorScheme: 'light',
  fontFamily: 'Arial',
  fontSizeMultiplier: 1,
  isLoaded: false,

  // 🔤 Diminui o tamanho da fonte dentro do limite mínimo
  decreaseFontSize: () => {
    const { fontSizeMultiplier } = get();
    if (fontSizeMultiplier > 0.8) {
      const newSize = fontSizeMultiplier - 0.1;
      set({ fontSizeMultiplier: newSize });
      AsyncStorage.setItem('fontSizeMultiplier', newSize.toString());
    }
  },

  // 🔠 Aumenta o tamanho da fonte dentro do limite máximo
  increaseFontSize: () => {
    const { fontSizeMultiplier } = get();
    if (fontSizeMultiplier < 1.5) {
      const newSize = fontSizeMultiplier + 0.1;
      set({ fontSizeMultiplier: newSize });
      AsyncStorage.setItem('fontSizeMultiplier', newSize.toString());
    }
  },

  // ⏬ Carrega as configurações armazenadas no AsyncStorage
  loadSettings: async () => {
    const fontFamily = (await AsyncStorage.getItem('fontFamily')) || 'Arial';

    const fontSizeMultiplier = parseFloat(
      (await AsyncStorage.getItem('fontSizeMultiplier')) || '1',
    );

    const storedColorScheme = await AsyncStorage.getItem('colorScheme');
    const colorScheme = ['light', 'dark', 'daltonic'].includes(storedColorScheme!)
      ? (storedColorScheme as 'light' | 'dark' | 'daltonic')
      : 'light';

    set({ fontFamily, fontSizeMultiplier, colorScheme, isLoaded: true });
  },

  // ♻️ Restaura as configurações padrão e limpa o AsyncStorage
  restoreDefaults: () => {
    set({ fontFamily: 'Arial', fontSizeMultiplier: 1, colorScheme: 'light' });
    AsyncStorage.multiRemove(['fontFamily', 'fontSizeMultiplier', 'colorScheme']);
  },

  // 🎨 Define o tema de cores escolhido e salva
  setColorScheme: (colorScheme) => {
    set({ colorScheme: colorScheme });
    AsyncStorage.setItem('colorScheme', colorScheme);
  },

  // 🖋️ Define a família tipográfica escolhida e salva
  setFontFamily: (fontFamily) => {
    set({ fontFamily: fontFamily });
    AsyncStorage.setItem('fontFamily', fontFamily);
  },
}));
