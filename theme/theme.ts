// theme.ts
// Define os temas de cor da aplicação: claro, escuro e daltônico.

export const themes = {
  light: {
    name: 'light',
    background: '#FFFFFF',
    surface: '#F2F2F2',
    primary: '#007AFF',
    text: '#1A1A1A',
    border: '#DDDDDD',
    shadow: '#00000020',
    link: '#1B95E0',
  },
  dark: {
    name: 'dark',
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#0A84FF',
    text: '#EDEDED',
    border: '#333333',
    shadow: '#FFFFFF20',
    link: '#4BA3FA',
  },
  daltonic: {
    name: 'daltonic',
    background: '#F5F5DC',
    surface: '#FFFFE0',
    primary: '#0055CC',
    text: '#000000',
    border: '#999900',
    shadow: '#22222220',
    link: '#0033AA',
  },
};

export type ThemeType = keyof typeof themes;
