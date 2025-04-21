<!-- markdownlint-disable-next-line MD041 -->
[← Voltar (Índice)](../index.md)

# 🎨 Configuração do Prettier

Este documento descreve as configurações definidas no arquivo `.prettierrc`, responsável por padronizar automaticamente o estilo do código-fonte da aplicação.

---

## 📁 Arquivo `.prettierrc`

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 🔍 Explicação das opções

- **`singleQuote: true`**  
  Utiliza **aspas simples** (`'`) ao invés de aspas duplas (`"`) em strings.

- **`semi: true`**  
  Adiciona **ponto e vírgula (`;`)** ao final das instruções automaticamente.

- **`printWidth: 100`**  
  Define que cada linha pode ter até **100 caracteres** antes de quebrar.

- **`tabWidth: 2`**  
  Usa **2 espaços** por nível de indentação.

- **`arrowParens: "always"`**  
  **Sempre inclui parênteses** em funções arrow, mesmo com um único argumento:  
  Exemplo:  
  ✅ `(x) => x + 1`  
  ❌ `x => x + 1`

- **`endOfLine: "lf"`**  
  Utiliza o caractere de quebra de linha **LF** (Unix), padronizando para evitar erros ao trabalhar entre Windows/Linux/Mac.

---

## 📁 Arquivo `.prettierignore`

O Prettier v3 ignora automaticamente arquivos listados no `.gitignore`.  
Ainda assim, **ignoramos manualmente os arquivos Markdown para evitar conflitos com o plugin `markdownlint`**.

Conteúdo do `.prettierignore`:

```gitignore
*.md
```

---

## 📦 Scripts no `package.json`

```json
"scripts": {
  "format": "prettier . --write",
  "format:check": "prettier . --check"
}
```

---

## 🧪 Comandos úteis

- **Verificar formatação sem modificar arquivos:**

```bash
npm run format:check
```

(ou `npx prettier . --check`)

- **Aplicar formatação automaticamente:**

```bash
npm run format
```

(ou `npx prettier . --write`)

---

[← Voltar (Índice)](../index.md)
