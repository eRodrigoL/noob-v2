// eslint.config.js
// ESLint Flat Config – novo formato oficial desde a versão 9.x
// Garante padronização de código, legibilidade e prevenção de erros.
// Compatível com TypeScript, React Native, Prettier e ambiente Expo.

import js from '@eslint/js'; // Regras básicas do JavaScript
import ts from '@typescript-eslint/eslint-plugin'; // Plugin TS (regras)
import tsParser from '@typescript-eslint/parser'; // Parser para arquivos .ts e .tsx
import react from 'eslint-plugin-react'; // Regras recomendadas para projetos React
import reactNative from 'eslint-plugin-react-native'; // Regras para React Native
import importPlugin from 'eslint-plugin-import'; // Verificação de imports
import jsxA11y from 'eslint-plugin-jsx-a11y'; // Acessibilidade para JSX
import prettier from 'eslint-config-prettier'; // Integração com Prettier (desativa conflitos)
import globals from 'globals';

export default [
  // Parser padrão para arquivos TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      react,
      'react-native': reactNative,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect', // Detecta automaticamente a versão do React instalada
      },
      'import/resolver': {
        // Configura o plugin 'eslint-plugin-import' para entender TypeScript e aliases
        typescript: {
          alwaysTryTypes: true, // Faz o resolver tentar sempre encontrar tipos mesmo sem declaração explícita
          project: './tsconfig.json', // Caminho para o arquivo de configuração do TypeScript (usado para entender aliases)
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactNative.configs.all.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+ não exige import de React
      'react-native/no-inline-styles': 'off', // Permite usar estilos inline
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Permite omitir tipo de retorno
    },
  },

  // Arquivos JS/TS comuns (sem regras específicas para React)
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // 🌐 Suporte a ambiente web (window, setTimeout, etc.)
        ...globals['react-native'], // 📱 Suporte a ambiente React Native
        __DEV__: 'readonly', // ✅ Modo de desenvolvimento (usado em React Native)
        clearInterval: 'readonly',
        console: 'readonly',
        process: 'readonly',
        setInterval: 'readonly',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Integração com Prettier: desativa regras de formatação conflitantes
  {
    rules: {
      ...prettier.rules,
    },
  },

  // Ignorar pastas não relevantes para lint
  {
    ignores: ['node_modules/', 'dist/', 'build/', '.expo/', 'assets/', 'coverage/'],
  },
];
