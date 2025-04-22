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
│   ├── 📁 [ ] (auth)/             // Rotas públicas (sem autenticação obrigatória)
│   │   ├── [ ] login.tsx           // Tela de login do usuário
│   │   └── [ ] register.tsx        // Tela de registro de novo usuário
│   └── 📁 [ ] (app)/              // Rotas privadas (após autenticação)
│       ├── [ ] _layout.tsx         // Layout com checagem de sessão/autenticação
│       ├── [ ] index.tsx           // Dashboard ou tela principal do app
│       ├── 📁 [ ] jogos/           // Seção de gerenciamento de jogos
│       │   ├── [ ] index.tsx       // Listagem de jogos cadastrados
│       │   ├── [ ] novo.tsx        // Cadastro de novo jogo
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
│       └── 📁 [ ] configuracoes/   // Configurações de personalização do app
│           └── [ ] index.tsx       // Ajustes de tema, fonte, acessibilidade, etc.
├── 📁 [ ] assets/                  // Recursos estáticos usados na aplicação
│   ├── 📁 [ ] fonts/               // Fontes personalizadas
│   └── 📁 [ ] images/              // Ícones, placeholders e outras imagens
├── 📁 [ ] components/              // Componentes reutilizáveis e independentes
│   ├── 📁 [ ] Header/              // Cabeçalho do app, com estilo dinâmico
│   ├── 📁 [ ] Form/                // Inputs, selects, dropdowns e formulários
│   └── ...                         // Outros componentes (Cards, Avatares, Botões, etc.)
├── 📁 [ ] constants/               // Valores fixos reutilizados em todo o app (temas, textos, rotas)
├── 📁 [x] docs/                    // Documentações internas do projeto
│   ├── 📁 [x] documentation/       // Documentação técnica por tópicos
│   │   ├── [x] commits.md          // Documenta os commits
│   │   ├── [x] dependencies.md     // Documenta as dependências
│   │   ├── [x] eslintConfig.md
│   │   ├── [x] folderTree.md       // Documenta a arquitetura de pastas
│   │   ├── [x] prettierConfig.md   // Documenta a configuração do Prettier
│   │   └── [x] tsconfig.md         // Documenta a configuração do TypeScript e seus aliases
│   └── [x] index.md                // Sumário da documentação
├── 📁 [ ] services/                // Comunicação com a API (axios)
│   ├── [ ] apiClient.ts            // Instância do Axios com configuração base
│   ├── [ ] usuarios.ts             // Funções relacionadas aos usuários
│   ├── [ ] jogos.ts                // Funções relacionadas aos jogos
│   ├── [ ] partidas.ts             // Funções relacionadas às partidas
│   └── [ ] avaliacoes.ts           // Funções relacionadas às estatísticas
├── 📁 [x] store/                   // Gerenciamento de estado com Zustand
│   ├── [ ] useSettingsStore.ts     // Tema, tamanho de fonte, acessibilidade
│   └── [ ] useUserStore.ts         // Estado do usuário logado (token, ID, etc.)
├── 📁 [x] tests/                   // Testes automatizados da aplicação
│   ├── [ ] 📁 unit/               // Testes unitários (funções puras, stores, helpers)
│   │   └── [ ] store.test.ts
│   ├── 📁 [ ] integration/        // Testes de integração (componentes, lógica de tela)
│   │   └── [ ] Header.test.tsx
│   └── 📁 [ ] e2e/                // Testes ponta a ponta (caso use Detox ou Playwright)
│       └── [ ] login-flow.test.ts
├── 📁 [x] theme/                   // Definição de temas e tipografia
│   ├── [ ] theme.ts                // Paleta de cores por tema (claro, escuro, daltônico)
│   ├── [ ] typography.ts           // Tamanhos base e multiplicadores de fonte
│   └── [ ] globalStyles.ts         // Estilos comuns reutilizados nos componentes
├── 📁 [ ] utils/                   // Funções utilitárias e helpers
│   ├── [ ] formatDate.ts           // Formata datas para exibição
│   └── [ ] validations.ts          // Validações reutilizáveis (ex: e-mail, senha)
├── [x] .env
├── [x] .gitignore                  // Arquivos/pastas ignorados pelo Git
├── [x] .prettierignore             // Arquivos ignorados pelo Prettier (*.md para não conflitar com a extensão markdownlint)
├── [x] .prettierrc                 // Configura o Prettier (formatação automática de código).
├── [x] app.config.js
├── [x] eslint.config.js            // Nova forma de configuração do ESLint (Flat Config).
├── [x] package-lock.json           // Gerado automaticamente pelo npm
├── [x] package.json                // Lista de dependências e scripts
├── [x] README.ms                   // Documento principal de apresentação do projeto.
├── [x] tsconfig.json               // Configurações do TypeScript e aliases
└── [x] vercel.json               // Configurações do TypeScript e aliases
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
