// app/_layout.tsx
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useKeepApiAwake } from '@hooks/useKeepApiAwake';
import { useLoadSettingsOnStart } from '@hooks/useLoadSettingsOnStart';

export default function RootLayout() {
  useKeepApiAwake(); // Despertar e manter API ativa
  useLoadSettingsOnStart(); // ✅ Carrega tema e fonte ao iniciar

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
