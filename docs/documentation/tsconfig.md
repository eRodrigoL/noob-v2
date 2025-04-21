<!-- markdownlint-disable-next-line MD041 -->
[← Voltar (Índice)](../index.md)

# ⚙️ Configuração do TypeScript (`tsconfig.json`)

Este arquivo define as configurações do compilador TypeScript para a aplicação Meepleteca. Ele foi ajustado para suportar:

- **Aliases** de importação
- **Regras mais seguras** via modo estrito
- **Desempenho otimizado** com verificação de tipos em bibliotecas desabilitada

---

## 🔧 Conteúdo do `tsconfig.json`

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "skipLibCheck": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@app/*": ["app/*"],
      "@assets/*": ["assets/*"],
      "@components/*": ["components/*"],
      "@constants/*": ["constants/*"],
      "@docs/*": ["docs/*"],
      "@services/*": ["services/*"],
      "@store/*": ["store/*"],
      "@tests/*": ["tests/*"],
      "@theme/*": ["theme/*"],
      "@utils/*": ["utils/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

---

## 🔍 Explicação por seção

### `"extends": "expo/tsconfig.base"`

Estende a configuração oficial do Expo, incluindo padrões seguros para React Native, JSX, módulos e libs DOM/ESNext.

---

### `"compilerOptions"`

#### `"skipLibCheck": true` ✅

Desativa a verificação de tipos em pacotes de terceiros (`node_modules`), acelerando builds e evitando erros desnecessários.

#### `"strict": true` ✅

Ativa o modo estrito do TypeScript, garantindo validação rigorosa de tipos (ex: `noImplicitAny`, `strictNullChecks`, etc.).

#### `"baseUrl": "."` ✅

Define o diretório raiz do projeto como ponto de partida para imports relativos.

#### `"paths"` ✅

Mapeia **aliases de importação** que tornam o código mais limpo e organizado. Exemplo:

```ts
import { apiClient } from '@services/apiClient';
```

- `@app/*` → `app/` (rotas com Expo Router)
- `@assets/*` → `assets/` (imagens, fontes)
- `@components/*` → `components/` (componentes reutilizáveis)
- `@constants/*` → `constants/` (valores fixos globais)
- `@docs/*` → `docs/` (documentação interna)
- `@services/*` → `services/` (comunicação com API)
- `@store/*` → `store/` (estado global com Zustand)
- `@tests/*` → `tests/` (testes automatizados)
- `@theme/*` → `theme/` (temas, cores, tipografia)
- `@utils/*` → `utils/` (funções auxiliares)

---

### `"include"`

Define os arquivos que serão considerados no processo de build/validação:

- Todos os arquivos `.ts` e `.tsx` no projeto
- Tipagens internas do Expo (`.expo/types`)
- Arquivo extra de ambiente do Expo (`expo-env.d.ts`)

---

## ✅ Resultado

Essas configurações permitem:

- Uso profissional e escalável de TypeScript
- Importações limpas com aliases
- Boa performance em builds
- Compatibilidade total com o Expo e ESLint

---

[← Voltar (Índice)](../index.md)
