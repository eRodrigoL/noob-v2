# 🎲 Noob

Esta é a aplicação para **Trabalho de Conclusão de Curso** do curso superior de **Tecnologia em Desenvolvimento de Software Multiplataforma** da **Fatec Mauá**.

Trata-se de uma aplicação multiplataforma (Android e Web) para o **registro de partidas de jogos de tabuleiro**, oferecendo ao usuário **análises de desempenho** com foco em acessibilidade e usabilidade.

---

## 🚀 Tecnologias Utilizadas

- **React Native** com TypeScript
- **Expo Router** (navegação por arquivos)
- **Zustand** (estado global)
- **AsyncStorage** (persistência local)
- **Axios + axios-retry** (consumo de API)
- **Vercel** (deploy web)
- **Render** (hospedagem da API REST)

## 🎯 Funcionalidades

- Cadastro e edição de usuário
- Cadastro e edição de jogos
- Registro de partidas (jogadores, pontuação, observações)
- Visualização de desempenho (estatísticas e gráficos)
- Acessibilidade: tema claro/escuro/daltônico, troca de fonte e tamanho ajustável
- Segurança: autenticação e sistema de denúncias

---

## 📁 Estrutura de Pastas

A navegação é gerenciada por **Expo Router**, e as rotas são determinadas pela estrutura da pasta `src/app`.

> Veja a árvore completa no arquivo [`docs/folderTree.md`](./docs/folderTree.md)

```ts
src/
├── app/                # Rotas (ex: login.tsx, settings.tsx, jogos/index.tsx)
├── assets/             # Fontes e imagens
├── components/         # Componentes reutilizáveis
├── docs/               # Documentação
├── services/           # Funções de consumo da API
├── store/              # Zustand (estado global)
├── theme/              # Tema de cores, tipografia, estilos globais
├── utils/              # Funções auxiliares
```

---

## ⚙️ Inicialização do Projeto

Este projeto foi iniciado com o comando:

```bash
npx create-expo-app@latest
```

Dando origem auma aplicação básica de exemplo.  
Em seguida, foi executado o script:

```bash
npm run reset-project
```

Trazendo a aplicação à uma estrutura base limpa e padronizada.

> O projeto é construído com base na documentação oficial do Expo:  
> [https://docs.expo.dev](https://docs.expo.dev)

---

## 📦 Instalação e Execução

1- Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

2- Instale as dependências:

```bash
npm install
```

3- Configure o arquivo `.env`:

```env
API_BASE_URL=https://link-raiz-da-api
```

4- Inicie o app:

```bash
npm start
```

---

## 📚 Documentação

A documentação técnica completa está disponível na pasta [`docs/`](./docs). Abaixo, alguns arquivos importantes:

- [`folderTree.md`](./docs/folderTree.md): estrutura de pastas e rotas
- [`dependenciesList.md`](./docs/dependenciesList.md): bibliotecas instaladas
- [`estilização.md`](./docs/styling.md): temas, tipografia, acessibilidade
- [`commits.md`](./docs/commits.md): padrão de mensagens de commit

---

## 🧑‍💻 Autores

**eRodrigoL:** GitHub [https://github.com/eRodrigoL](https://github.com/eRodrigoL)
**Xketh:** GitHub [https://github.com/Xketh](https://github.com/Xketh)
**motathais:** GitHub [https://github.com/motathais](https://github.com/motathais)
Alunos da Fatec Mauá entre 2022 e 2025
Curso: Tecnologia em Desenvolvimento de Software Multiplataforma
