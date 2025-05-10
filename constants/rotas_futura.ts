// src/constants/routes.ts
export const ROUTES = {
  // USER:
  USER: {
    EDIT: '', // EDITAR PERFIL
    LOGIN: '/login',
    PROFILE: '', // PERFIL DO USUÁRIO
    REGISTER: '', // REGISTRAR PERFIL
    SETTINGS: '/settings',
  },
  GAME: {
    EDIT: '', // EDITAR PERFIL DO JOGO
    LIST: '', // LISTA DE JOGOS
    PROFILE: '', // PERFIL DO JOGO
    REGISTER: '', // REGISTRAR JOGO
  },
  MATCHES: {
    PLAY: '', // INICIAR REGISTRO DE PARTIDA
    FINISH: '', // FINALIZAR REGISTRO DE PARTIDA EDITANDO A QUE FOI INICIADA
  },
  HOME: '/test', // PASSARÁ A SER A LISTA DE JOGOS
  TEST: '/test', // DEIXARÁ DE EXISTIR QUANDO NÃO HOUVER MAIS TELAS A CRIAR
} as const;
