// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { Splash } from '@components/index';
import { useKeepApiAwake } from '@hooks/useKeepApiAwake';
import { useSettingsStore } from '@store/useSettingsStore';

export default function RootLayout() {
  const isLoaded = useSettingsStore((state) => state.isLoaded);
  const loadSettings = useSettingsStore((state) => state.loadSettings);

  // ✅ Correto: hook personalizado chamado diretamente no componente
  useKeepApiAwake();

  useEffect(() => {
    loadSettings(); // ✅ loadSettings é assíncrono, mas não precisa await aqui
  }, []);

  if (!isLoaded) return <Splash />;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </>
  );
}
