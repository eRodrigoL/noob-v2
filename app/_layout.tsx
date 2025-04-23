// app/_layout.tsx
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Stack } from 'expo-router';
import { warmUpApi } from '@hooks/useWarmUpApi';

export default function RootLayout() {
  // Ref para rastrear o estado atual do app (ativo/inativo)
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    // 🔥 1. Acorda ao iniciar o app
    warmUpApi();

    // 🔁 2. Acorda ao voltar do segundo plano
    const appStateListener = AppState.addEventListener('change', (nextState) => {
      const isReturningFromBackground =
        appState.current.match(/inactive|background/) && nextState === 'active';

      if (isReturningFromBackground) {
        warmUpApi();
      }

      appState.current = nextState;
    });

    // 🔄 3. Mantém a API acordada a cada 4 minutos (240.000 ms)
    const intervalId = setInterval(() => {
      if (appState.current === 'active') {
        warmUpApi();
      }
    }, 240_000);

    // 💧 Limpa tudo ao desmontar
    return () => {
      appStateListener.remove();
      clearInterval(intervalId);
    };
  }, []);

  // Renderiza as rotas empilhadas (Stack) normalmente
  return <Stack />;
}
