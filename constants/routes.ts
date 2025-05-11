// src/constants/routes.ts

export const ROUTES = {
  // USER:
  USER: {
    LOGIN: '/login',
    SETTINGS: '/settings',
  },
  HOME: '/test', // PASSARÁ A SER A LISTA DE JOGOS
  TEST: '/test', // DEIXARÁ DE EXISTIR QUANDO NÃO HOUVER MAIS TELAS A CRIAR
} as const;

// Utilitário para extrair todas as rotas válidas como union type de strings
type ExtractRoutes<T> = T extends string ? T : { [K in keyof T]: ExtractRoutes<T[K]> }[keyof T];

// Tipo exportado com todas as rotas que são `string` (e apenas elas)
export type ValidRoutes = ExtractRoutes<typeof ROUTES>;
