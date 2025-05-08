// app/_layout.tsx
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useKeepApiAwake } from '@hooks/useKeepApiAwake';
import { SafeAreaView } from 'react-native';

export default function RootLayout() {
  useKeepApiAwake(); // Despertar e manter API ativa

  // Renderiza as rotas empilhadas (Stack) normalmente
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false, // 👈 Desativa o cabeçalho nativo
        }}
      />
      <Toast />
    </SafeAreaView>
  );
}
