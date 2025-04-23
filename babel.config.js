// babel.config.js
// Configuração do Babel alinhada com ES Modules (import/export)

export default function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            '@': './',
            '@app': './app',
            '@assets': './assets',
            '@components': './components',
            '@constants': './constants',
            '@docs': './docs',
            '@hooks': './hooks',
            '@services': './services',
            '@store': './store',
            '@tests': './tests',
            '@theme': './theme',
            '@utils': './utils',
          },
        },
      ],
      'expo-router/babel', // Plugin obrigatório para Expo Router
    ],
  };
}
