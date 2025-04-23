<!-- markdownlint-disable-next-line MD041 -->
[← Voltar](../index.md)

# 📦 Dependências

Este documento lista todas as dependências instaladas no projeto, com foco em **controle histórico**, **organização por categoria** e **entendimento técnico do papel de cada pacote**.

---

## 📜 Histórico de Instalação

As dependências estão listadas na **ordem exata em que foram instaladas** durante o desenvolvimento. Isso facilita a rastreabilidade de alterações e o diagnóstico de eventuais problemas.

```bash
npm install --save-dev eslint
npm install --save-dev @typescript-eslint/eslint-plugin
npm install --save-dev @typescript-eslint/parser
npm install --save-dev eslint-plugin-react
npm install --save-dev eslint-plugin-react-native
npm install --save-dev eslint-plugin-import
npm install --save-dev eslint-plugin-jsx-a11y
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-import-resolver-typescript
npm install --save-dev prettier
npm install dotenv
# npx expo export -p web
npm install axios
npm install axios-retry
# Atual:
npm install zustand
npm install --save-dev @types/zustand
```

---

## 🗂️ Dependências por Categoria

Abaixo, as bibliotecas estão organizadas por **função na aplicação**, com o nome do pacote, o comando utilizado para instalação e uma descrição técnica do uso previsto.

---

### ⚙️ Core (Expo / React Native)

- **expo**: `npm install expo` (npx create-expo-app@latest)  
  Plataforma que simplifica o uso do React Native, fornecendo ferramentas de build, preview, deploy e acesso a APIs nativas.

- **react-native**: `npm install react-native` (npx create-expo-app@latest)  
  Biblioteca principal de UI que permite o desenvolvimento nativo com JavaScript.

- **react**: `npm install react` (npx create-expo-app@latest)  
  Biblioteca de construção de interfaces declarativas, base para React Native e Web.

- **react-dom**: `npm install react-dom` (npx create-expo-app@latest)  
  Permite renderizar aplicações React no ambiente web.

- **react-native-web**: `npm install react-native-web` (npx create-expo-app@latest)  
  Adapta os componentes do React Native para rodarem em navegadores web.

- **expo-router**: `npm install expo-router` (npx create-expo-app@latest)  
  Gerencia rotas com base em arquivos. Substitui o React Navigation tradicional com uma estrutura moderna e automatizada.

---

### 🎨 Estilização e UI

- **@expo/vector-icons**: `npm install @expo/vector-icons` (npx create-expo-app@latest)  
  Conjunto de ícones integrados ao Expo, compatível com React Native.

- **expo-system-ui**: `npm install expo-system-ui` (npx create-expo-app@latest)  
  Permite controlar o estilo da barra de status e cores do sistema.

- **expo-blur**: `npm install expo-blur` (npx create-expo-app@latest)  
  Fornece componentes com efeito de desfoque (blur), úteis para sobreposições e visuais modernos.

- **expo-font**: `npm install expo-font` (npx create-expo-app@latest)  
  Gerencia e carrega fontes personalizadas localmente ou da web.

- **expo-constants**: `npm install expo-constants` (npx create-expo-app@latest)  
  Acesso a informações do app em tempo de execução, como `appVersion`, `expoConfig`, entre outras.

---

### 🧭 Navegação

- **@react-navigation/native**: `npm install @react-navigation/native` (npx create-expo-app@latest)  
  Biblioteca base para navegação declarativa em React Native (ainda utilizada como dependência do Expo Router).

- **@react-navigation/bottom-tabs**: `npm install @react-navigation/bottom-tabs` (npx create-expo-app@latest)  
  Navegação com abas na parte inferior da tela (usada opcionalmente em projetos com rotas agrupadas).

- **expo-linking**: `npm install expo-linking` (npx create-expo-app@latest)  
  Utilitário para deep linking entre telas do app ou links externos.

---

### 💬 Experiência do Usuário

- **expo-haptics**: `npm install expo-haptics` (npx create-expo-app@latest)  
  Permite vibrações táteis em ações do usuário (feedback físico).

- **expo-status-bar**: `npm install expo-status-bar` (npx create-expo-app@latest)  
  Componente para controle da aparência da barra de status (cores, visibilidade etc).

- **expo-splash-screen**: `npm install expo-splash-screen` (npx create-expo-app@latest)  
  Gerencia a tela de carregamento (splash screen) nativa do app.

- **expo-web-browser**: `npm install expo-web-browser` (npx create-expo-app@latest)  
  Abre links externos dentro de um navegador embutido (custom tabs/Safari View).

---

### ✋ Gestos e Áreas Seguras

- **react-native-gesture-handler**: `npm install react-native-gesture-handler` (npx create-expo-app@latest)  
  Suporte a gestos nativos (swipe, pan, tap, etc.), necessário para navegação e componentes interativos.

- **react-native-reanimated**: `npm install react-native-reanimated` (npx create-expo-app@latest)  
  Animações complexas com performance nativa, essencial para navegadores e transições.

- **react-native-screens**: `npm install react-native-screens` (npx create-expo-app@latest)  
  Otimiza a renderização de telas, melhorando performance da navegação.

- **react-native-safe-area-context**: `npm install react-native-safe-area-context` (npx create-expo-app@latest)  
  Gerencia áreas seguras em dispositivos com notch ou barras nativas (ex: iPhone X).

---

### 🌐 Navegador e WebView

- **react-native-webview**: `npm install react-native-webview` (npx create-expo-app@latest)  
  Componente para renderizar páginas web dentro do app, útil para visualização de documentos, termos, ou links externos.

---

### 🧪 Testes e Tipagens (devDependencies)

- **jest**: `npm install --save-dev jest` (npx create-expo-app@latest)  
  Test runner utilizado para testes unitários e integração.

- **jest-expo**: `npm install --save-dev jest-expo` (npx create-expo-app@latest)  
  Preset que adapta o Jest ao ambiente do Expo.

- **@types/jest**: `npm install --save-dev @types/jest` (npx create-expo-app@latest)  
  Tipagens TypeScript para o Jest.

- **react-test-renderer**: `npm install --save-dev react-test-renderer` (npx create-expo-app@latest)  
  Renderiza componentes React em ambiente de teste.

- **@types/react-test-renderer**: `npm install --save-dev @types/react-test-renderer` (npx create-expo-app@latest)  
  Tipagens TypeScript para o `react-test-renderer`.

- **@types/react**: `npm install --save-dev @types/react` (npx create-expo-app@latest)  
  Tipagens para a biblioteca React.

- **typescript**: `npm install --save-dev typescript` (npx create-expo-app@latest)  
  Superset do JavaScript que adiciona tipagem estática ao código.

---

[← Voltar](../index.md)
