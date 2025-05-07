// app/_layout.tsx
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useKeepApiAwake } from '@hooks/useKeepApiAwake';

export default function RootLayout() {
  useKeepApiAwake(); // Despertar e manter API ativa

  // Renderiza as rotas empilhadas (Stack) normalmente
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // 👈 Desativa o cabeçalho nativo
        }}
      />
      <Toast />
    </>
  );
}
