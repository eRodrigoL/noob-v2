<!-- markdownlint-disable-next-line MD041 -->
[← Voltar (Índice)](../index.md)

# 🎨 Documentação técnica da estilização

Este documento descreve detalhadamente a estratégia de estilização adotada até aqui na aplicação.  
O foco atual é na **implementação técnica** da estilização, enquanto a criação visual definitiva das telas será abordada em etapas futuras.

---

## 📌 Objetivo da estilização

Oferecer ao usuário uma experiência visual personalizada com alterações imediatas conforme escolhas feitas em relação a:

- **Fonte** (tipo de letra)
- **Tamanho da fonte** (acessibilidade)
- **Tema de cores** (Claro, Escuro e Daltônico)

---

## 📂 Estrutura e responsabilidades

A estilização está organizada em três arquivos principais dentro da pasta `src/theme/`:

- `theme.ts`
- `typography.ts`
- `globalStyles.ts`

### 1. `theme.ts`

"Fonte da verdade" para as **paletas de cores** disponíveis:

- `light` (tema claro padrão)
- `dark` (tema escuro)
- `daltonic` (tema adaptado para acessibilidade a daltônicos)

Cada paleta define:

- Fundo (`backgroundPrimary`, `backgroundSecondary`)
- Textos (`textPrimary`, `textSecondary`)
- Destaques (`highlight`)
- Bordas (`border`)
- Links (`link`)

---

### 2. `typography.ts`

Responsável por definir:

- **Fontes disponíveis** (`arial`, `times`, `openSans`)
- **Tamanho base** de fonte (`fontSizes.base`)
- **Multiplicadores** para tamanhos pequenos, grandes e gigantes
- **Limites** máximos e mínimos de acessibilidade

Além disso, organiza os tamanhos em:

- `small`
- `base`
- `large`
- `giant`

Com ajuste dinâmico via multiplicador.

---

### 3. `globalStyles.ts`

Contém **estilos globais** e **reutilizáveis** independentes das escolhas dinâmicas, como:

- Flex containers
- Centralizações
- Paddings e margens padrões
- Espaçamentos utilitários

> Nota: GlobalStyles são estilos estáticos que não dependem do tema ou das escolhas do usuário.

---

## ⚙️ Como modificar ou expandir os estilos da aplicação

### 🎨 Paletas de Cores (`theme.ts`)

- **Adicionar uma nova cor em uma paleta existente:**

  ```tsx
  light: {
    backgroundPrimary: '#FFFFFF',
    textPrimary: '#000000',
    novoElemento: '#ABCDEF', // Nova cor adicionada
  }
  ```

- **Criar uma nova paleta de tema:**

  ```tsx
  sepia: {
    backgroundPrimary: '#F4ECD8',
    textPrimary: '#5B4636',
    highlight: '#CBB994',
    border: '#DDD',
    link: '#8B4513',
  }
  ```

  > Após criar a nova paleta, registre-a nos tipos aceitos pelo Zustand (`useSettingsStore.ts`) e na tela de configurações.

---

### 🔠 Fontes (`typography.ts` + `assets/fonts` + carregamento no `app/_layout.tsx`)

- **Adicionar nova fonte personalizada:**

  1. Adicionar o arquivo `.ttf` na pasta `assets/fonts/`
  2. Configurar o carregamento no `src/app/_layout.tsx` utilizando o hook `useFonts`:

     ```tsx
     const [fontsLoaded] = useFonts({
       TimesNewRoman: require('../../assets/fonts/TimesNewRoman.ttf'),
     });
     ```

  3. Declarar no `typography.ts`:

     ```tsx
     fonts: {
       timesNewRoman: 'TimesNewRoman',
     }
     ```

  4. Atualizar a lista de opções no seletor de fontes em `settings/index.tsx`.

---

### 🔡 Tamanhos de Fonte (`typography.ts`)

- **Modificar tamanho base e multiplicadores:**

  ```tsx
  fontSizes: {
    small: 0.8,
    base: 1,
    large: 1.2,
    giant: 1.5,
  },
  minFontMultiplier: 0.8,
  maxFontMultiplier: 1.5,
  ```

Esses valores controlam o ajuste de tamanho conforme preferências de acessibilidade.

---

### 🧱 Estilos Fixos (`globalStyles.ts`)

- **Adicionar novos estilos globais:**

  ```tsx
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ```

  > Lembre-se: `globalStyles` deve conter apenas estilos estáticos.

---

## 🌐 Gerenciamento dinâmico dos estilos

### 📌 Zustand (`useSettingsStore.ts`)

Gerencia o estado global das configurações de estilização:

- Fonte selecionada
- Multiplicador de tamanho de fonte
- Tema de cores ativo

Utiliza persistência automática via `AsyncStorage`.

---

### 📌 Hook personalizado (`useTheme.ts`)

Hook que:

- Consome o estado atual do `useSettingsStore`
- Combina as escolhas do usuário com definições fixas de `theme.ts` e `typography.ts`
- Fornece dados prontos (`colors`, `font`, `fontSizes`) para os componentes

Esse hook é responsável por manter a aplicação atualizada dinamicamente conforme as preferências do usuário.

---

### 🔄 Ciclo de atualização visual

1. Usuário altera configurações na tela `settings/index.tsx`
2. As escolhas são refletidas visualmente de forma imediata.
3. Ao confirmar, as preferências são salvas no Zustand e persistidas localmente.
4. Todas as telas que usam o `useTheme()` atualizam automaticamente seus estilos.

---

## 🎯 Pré-visualização de alterações em tempo real

- A tela de configurações permite ao usuário **visualizar imediatamente** o efeito das mudanças antes de salvá-las.
- Essa funcionalidade é possível através do controle de estados locais, que simulam a aplicação sem alterar o Zustand de forma prematura.

---

## 📚 Próximas etapas previstas

- Aplicar as configurações dinâmicas em todas as telas e componentes futuros.
- Refatorar elementos visuais para respeitar as fontes, tamanhos e cores definidos.
- Considerar a troca do AsyncStorage por salvamento remoto via API (integração com perfis de usuários).

---

[← Voltar (Índice)](../index.md)
