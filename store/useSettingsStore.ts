// Importa a função create do Zustand para criar o store
import { create } from 'zustand';
// Importa AsyncStorage para persistência de dados
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define o tipo para o estado e as ações do store de configurações
type SettingsState = {
  fontFamily: string;
  fontSizeMultiplier: number;
  colorScheme: 'light' | 'dark' | 'daltonic';
  setFontFamily: (_fontFamily: string) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setColorScheme: (scheme: 'light' | 'dark' | 'daltonic') => void;
  restoreDefaults: () => void;
  loadSettings: () => Promise<void>;
};

// Cria e exporta o hook useSettingsStore usando Zustand
export const useSettingsStore = create<SettingsState>((set, get) => ({
  // Estado inicial
  colorScheme: 'light',
  fontFamily: 'Arial',
  fontSizeMultiplier: 1,

  // Função para definir a família da fonte
  setFontFamily: (fontFamily) => {
    set({ fontFamily });
    AsyncStorage.setItem('fontFamily', fontFamily);
  },

  // Função para aumentar o tamanho da fonte
  increaseFontSize: () => {
    const { fontSizeMultiplier } = get();
    if (fontSizeMultiplier < 1.5) {
      const newSize = fontSizeMultiplier + 0.1;
      set({ fontSizeMultiplier: newSize });
      AsyncStorage.setItem('fontSizeMultiplier', newSize.toString());
    }
  },

  // Função para diminuir o tamanho da fonte
  decreaseFontSize: () => {
    const { fontSizeMultiplier } = get();
    if (fontSizeMultiplier > 0.8) {
      const newSize = fontSizeMultiplier - 0.1;
      set({ fontSizeMultiplier: newSize });
      AsyncStorage.setItem('fontSizeMultiplier', newSize.toString());
    }
  },

  // Função para definir o esquema de cores
  setColorScheme: (colorScheme) => {
    set({ colorScheme });
    AsyncStorage.setItem('colorScheme', colorScheme);
  },

  // Função para restaurar as configurações padrão
  restoreDefaults: () => {
    set({ fontFamily: 'Arial', fontSizeMultiplier: 1, colorScheme: 'light' });
    AsyncStorage.multiRemove(['fontFamily', 'fontSizeMultiplier', 'colorScheme']);
  },

  // Função assíncrona para carregar as configurações salvas
  loadSettings: async () => {
    // Carrega a família da fonte (usa "Arial" como padrão se não encontrar)
    const fontFamily = (await AsyncStorage.getItem('fontFamily')) || 'Arial';

    // Carrega o multiplicador de tamanho da fonte (usa 1 como padrão se não encontrar)
    const fontSizeMultiplier = parseFloat(
      (await AsyncStorage.getItem('fontSizeMultiplier')) || '1',
    );

    // Carrega o esquema de cores salvo
    const storedColorScheme = await AsyncStorage.getItem('colorScheme');

    // Verifica se o esquema de cores é válido, caso contrário usa "light"
    const colorScheme = ['light', 'dark', 'daltonic'].includes(storedColorScheme!)
      ? (storedColorScheme as 'light' | 'dark' | 'daltonic')
      : 'light';

    // Atualiza o estado com as configurações carregadas
    set({ fontFamily, fontSizeMultiplier, colorScheme });
  },
}));
