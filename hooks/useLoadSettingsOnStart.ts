// src/hooks/useLoadSettingsOnStart.ts
import { useEffect } from 'react';
import { useSettingsStore } from '@store/useSettingsStore';

export function useLoadSettingsOnStart() {
  useEffect(() => {
    useSettingsStore.getState().loadSettings();
  }, []);
}
