<!-- markdownlint-disable-next-line MD041 -->
[← Voltar (README)](../index.md)

# 📁 Estrutura de Pastas e Rotas (`folderTree.md`)

Este documento descreve a organização de arquivos da aplicação **Meepleteca**, que utiliza **Expo Router** para gerenciamento de rotas com base no sistema de arquivos.

A estrutura foi planejada para facilitar a **modularização**, **acessibilidade**, **navegação por autenticação** e a escalabilidade do projeto.

---

## 📦 Estrutura Completa

```ts
([x] = arquivos ou pastas já presentes na aplicação)
📁 [x] src/
├── 📁 [x] app/                     // 🧭 Rotas definidas por arquivos com Expo Router
│   ├── [x] _layout.tsx             // Layout global com provedores (SafeArea, Theme, etc.)
│   ├── [x] index.tsx               // Tela inicial (pode redirecionar para login ou dashboard)
│   ├── [ ] +not-found.tsx          // Tela para rotas inexistentes (404)
│   ├── 📁 [x] (auth)/              // Rotas públicas (sem autenticação obrigatória)
│   │   ├── [x] login.tsx           // Tela de login do usuário
│   │   └── [ ] register.tsx        // Tela de registro de novo usuário
│   └── 📁 [x] (app)/               // Rotas privadas (após autenticação)
│       ├── [ ] _layout.tsx         // Layout com checagem de sessão/autenticação
│       ├── [x] index.tsx           // Dashboard ou tela principal do app
│       ├── 📁 [x] boardgame/       // Seção de gerenciamento de jogos
│       │   ├── [x] index.tsx       // Listagem de jogos cadastrados
│       │   ├── [ ] registerGame.tsx // Cadastro de novo jogo
│       │   └── [ ] [id].tsx        // Edição ou visualização de um jogo específico
│       ├── 📁 [ ] partidas/        // Registro e histórico de partidas
│       │   ├── [ ] index.tsx       // Listagem de partidas do usuário
│       │   ├── [ ] nova.tsx        // Tela para registrar nova partida
│       │   └── [ ] [id].tsx        // Detalhes ou edição de uma partida
│       ├── 📁 [ ] desempenho/      // Visualizações e análises de desempenho
│       │   └── [ ] index.tsx       // Gráficos e métricas sobre partidas
│       ├── 📁 [ ] perfil/          // Dados do usuário logado
│       │   ├── [ ] index.tsx       // Visualização das informações do perfil
│       │   └── [ ] editar.tsx      // Formulário para edição de perfil
│       ├── 📁 [x] settings/        // Configurações de personalização do app
│       │   └── [x] index.tsx       // Ajustes de tema, fonte, acessibilidade, etc.
│       └── 📁 [x] test/            // Tela de testes
│           └── [x] index.tsx       // Tela auxiliar para testar componentes e funcionalidades
├── 📁 [ ] assets/                  // Recursos estáticos usados na aplicação
│   ├── 📁 [ ] fonts/               // Fontes personalizadas
│   └── 📁 [x] images/              // Ícones, placeholders e outras imagens
│       ├── 📁 [x] boardgame/       // Animações ou ícones relacionados a jogos
│       │   └── [x] loading.gif
│       ├── 📁 [x] users/           // Fotos e placeholders de usuários
│       │   └── [x] userCover.png
│       ├── 📁 [ ] games/           // Imagens específicas de jogos ou capas
│       ├── 📁 [ ] ui/              // Elementos da interface do app (ícones, ilustrações, etc)
│       ├── 📁 [x] placeholders/    // Imagens de recurso ausente (ex: \"imagem não encontrada\")
│       │   └── [x] unavailable.png
│       └── 📁 [ ] backgrounds/     // Fundos decorativos ou imagens de tela cheia
├── 📁 [x] components/              // Componentes reutilizáveis e independentes
│   ├── [x] index.tsx               // Export centralizado dos componentes
│   ├── 📁 [x] buttons/             // Botões personalizados e reutilizáveis
│   │   ├── 📁 [x] ButtonHighlight.tsx
│   │   │   └── [x] index.tsx
│   │   ├── 📁 [x] ButtonSemiHighlight.tsx
│   │   │   └── [x] index.tsx
│   │   └── 📁 [x] SandwichMenu.tsx // Menu lateral com animação e autenticação
│   │       ├── [x] index.tsx
│   │       └── [x] styles.tsx
│   ├── 📁 [x] cards/               // Componentes visuais com informações resumidas
│   │   └── 📁 [x] GameCard.tsx     // Cartão de jogo com título, capa, nota, etc.
│   │       ├── [x] index.tsx
│   │       └── [x] styles.tsx
│   └── 📁 [x] layouts/             // Estruturas de layout para telas
│       └── 📁 [x] HeaderLayout.tsx // Cabeçalho com título, botões e children com ou sem scroll
│           ├── [x] index.tsx
│           └── [x] styles.tsx
├── 📁 [x] constants/               // Valores fixos reutilizados em todo o app
│   ├── [x] images.ts               // Importações centralizadas de imagens
│   ├── [x] index.ts                // Exporte global de todos os constants
│   └── [x] routes.ts              // Mapeamento de rotas nomeadas
├── 📁 [x] docs/                    // Documentações internas do projeto
│   ├── [x] index.md               // Sumário da documentação
│   └── 📁 [x] documentation/      // Documentação técnica por tópicos
│       ├── [x] commits.md         // Padrão e exemplos de commits utilizados
│       ├── [x] dependencies.md    // Lista e explicação das bibliotecas utilizadas
│       ├── [x] eslintConfig.md    // Detalhes sobre configuração e regras do ESLint
│       ├── [x] folderTree.md      // Arquitetura de pastas (este arquivo)
│       ├── [x] prettierConfig.md  // Detalhes da configuração do Prettier
│       ├── [x] styling.md         // Padrões de estilo visual do app
│       └── [x] tsconfig.md        // Explicação dos paths e configuração do TypeScript
├── 📁 [x] hooks/                  // Hooks personalizados
│   ├── [x] useKeepApiAwake.ts     // Mantém a API acordada com chamadas periódicas
│   ├── [x] useTheme.ts            // Retorna tema, fonte e escalas baseadas na store
│   └── [x] useWarmUpApi.ts        // Executa uma requisição inicial para \"acordar\" a API
├── 📁 [x] services/               // Comunicação com a API (via axios)
│   ├── [x] apiClient.ts           // Instância do Axios com baseURL e interceptadores
│   ├── [ ] usuarios.ts            // Funções relacionadas aos usuários
│   ├── [ ] jogos.ts               // Funções relacionadas aos jogos
│   ├── [ ] partidas.ts            // Funções relacionadas às partidas
│   └── [ ] avaliacoes.ts          // Funções relacionadas às análises de desempenho
├── 📁 [x] store/                  // Gerenciamento de estado global com Zustand
│   ├── [x] useSettingsStore.ts    // Tema, tamanho de fonte, acessibilidade
│   └── [ ] useUserStore.ts        // Armazena dados do usuário logado (token, ID, etc.)
├── 📁 [ ] tests/                  // Testes automatizados da aplicação
│   ├── 📁 [ ] unit/               // Testes unitários (funções puras, stores, helpers)
│   │   └── [ ] store.test.ts
│   ├── 📁 [ ] integration/        // Testes de integração (componentes e lógica de tela)
│   │   └── [ ] Header.test.tsx
│   └── 📁 [ ] e2e/                // Testes ponta a ponta com Playwright/Detox
│       └── [ ] login-flow.test.ts
├── 📁 [x] theme/                 // Definição de temas e tipografia
│   ├── [x] index.ts              // Exporta temas, fontes, estilos globais
│   └── 📁 [x] global/            // Agrupamento de configuração visual base
│       ├── [x] theme.ts          // Paleta de cores por tema (claro, escuro, daltônico)
│       ├── [x] typography.ts     // Tamanhos base e multiplicadores de fonte
│       └── [x] globalStyles.ts   // Estilos globais reutilizados (layout, alinhamento, etc.)
├── 📁 [x] utils/                 // Funções utilitárias reutilizáveis
│   ├── [ ] formatDate.ts         // Função para formatação de datas
│   ├── [x] logger.ts             // Logger para console em modo dev
│   └── [ ] validations.ts        // Funções para validação de entradas (e-mail, senha, etc.)
├── [x] .env                      // Variáveis de ambiente (ex: EXPO_PUBLIC_API_BASE_URL)
├── [x] .gitignore                // Arquivos/pastas ignorados pelo Git
├── [x] .prettierignore           // Arquivos ignorados pelo Prettier (*.md por padrão)
├── [x] .prettierrc               // Configurações do Prettier
├── [x] app.config.js             // Configuração do Expo com suporte a .env
├── [x] babel.config.js           // Configuração dos aliases e Babel
├── [x] declarations.d.ts         // Declaração de módulos e extensões (ex: imagens)
├── [x] eslint.config.js          // ESLint Flat Config (v9+) com suporte a TS e React Native
├── [x] package-lock.json         // Lockfile gerado pelo npm
├── [x] package.json              // Dependências e scripts do projeto
├── [x] README.ms                 // Documento principal de apresentação do projeto
├── [x] tsconfig.json             // Configurações do TypeScript e aliases de path
└── [x] vercel.json               // Configurações de deploy na Vercel
```

---

## 🧭 Expo Router: Rotas por Arquivo

A navegação é feita com base nos nomes de arquivos e pastas dentro de `src/app/`.  
Agrupamentos como `(auth)` e `(app)` ajudam a organizar e proteger rotas por contexto (público/privado).

Exemplos:

- `/login` → `src/app/(auth)/login.tsx`
- `/jogos/novo` → `src/app/(app)/jogos/novo.tsx`
- `/partidas/42` → `src/app/(app)/partidas/[id].tsx`

---

## 🧱 Organização Modular

Cada responsabilidade tem seu lugar claro:

- `components/`: para reuso visual e funcional
- `theme/` + `store/`: para personalização visual centralizada
- `services/`: para comunicação com a API
- `utils/`: para lógica auxiliar desacoplada

[← Voltar (README)](../index.md)
