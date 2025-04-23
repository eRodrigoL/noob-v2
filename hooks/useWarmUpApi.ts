// hooks/useWarmUpApi.ts
// Função responsável por "acordar" a API assim que o app for carregado.
// Útil para servidores gratuitos que hibernam por inatividade (ex: Render, Railway).

import { apiClient } from '@services/apiClient';
import axios from 'axios'; // Para identificar o tipo do erro

/**
 * Envia uma requisição GET leve para "acordar" a API assim que o app for iniciado.
 */
export async function warmUpApi(): Promise<void> {
  try {
    // Envia uma requisição leve para um endpoint público
    await apiClient.get('/jogos');

    if (__DEV__) {
      console.log('🔥 [warmUpApi] API acordada com sucesso!');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (__DEV__) {
        if (error.code === 'ECONNABORTED') {
          console.warn('⚠️ [warmUpApi] Timeout ao tentar acordar a API (provavelmente iniciando).');
        } else {
          console.warn('⚠️ [warmUpApi] Erro ao acordar a API:', error.message);
        }
      }
    } else {
      if (__DEV__) {
        console.warn('⚠️ [warmUpApi] Erro inesperado ao acordar a API.');
      }
    }
  }
}
