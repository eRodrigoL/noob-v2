<!-- markdownlint-disable-next-line MD041 -->
[← Voltar (Índice)](../index.md)

# 🧪 Configuração do ESLint (`eslint.config.js`)

Este arquivo define as regras de lint (análise de qualidade de código) usadas na aplicação.  
A configuração segue o novo formato **Flat Config**, introduzido no **ESLint 9.x+**, e inclui suporte completo para:

- TypeScript
- React e React Native
- Acessibilidade (`jsx-a11y`)
- Boas práticas de importação
- Integração com o Prettier

---

## 🧩 Objetivo do ESLint no projeto

- Detectar e evitar **erros comuns de sintaxe**
- Sugerir boas práticas de codificação
- Garantir um estilo de código mais limpo e consistente
- Integrar com Prettier para evitar conflitos entre lint e formatação

---

## ⚙️ Estrutura do `eslint.config.js`

```js
// eslint.config.js
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default [
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
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
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
      'react/react-in-jsx-scope': 'off',
      'react-native/no-inline-styles': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  {
    rules: {
      ...prettier.rules,
    },
  },

  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.expo/',
      'assets/',
      'coverage/',
    ],
  },
];
```

---

## 🔎 Sobre os principais plugins utilizados

- **`@typescript-eslint`**: Habilita regras específicas para projetos em TypeScript.
- **`eslint-plugin-react`**: Regras recomendadas para React.
- **`eslint-plugin-react-native`**: Boas práticas para código React Native.
- **`eslint-plugin-import`**: Valida e organiza importações corretamente.
- **`eslint-plugin-jsx-a11y`**: Garante acessibilidade em componentes JSX.
- **`eslint-config-prettier`**: Desativa regras que conflitam com o Prettier.

---

## 🧪 Comandos úteis

- Para executar o lint manualmente:

```bash
npm run lint
```

- Exemplo do script no `package.json`:

```json
"lint": "eslint app --ext .ts,.tsx"
```

---

## ✅ Benefícios dessa configuração

- Uso da nova arquitetura Flat Config (ESLint 9.x)
- Integração automática com `tsconfig.json` (aliases incluídos)
- Adoção de boas práticas por padrão
- Suporte completo para código multi-plataforma (Web + Android)

---

[← Voltar (Índice)](../index.md)
