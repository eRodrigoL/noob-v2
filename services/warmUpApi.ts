// services/warmUpApi.ts
// Função responsável por "acordar" a API assim que o app for carregado.
// Isso é útil para evitar lentidões causadas por servidores gratuitos que hibernam (ex: Render, Railway).

import { apiClient } from '@services/apiClient';
import axios from 'axios'; // Necessário para identificar erro Axios

export async function warmUpApi(): Promise<void> {
  try {
    // Envia uma requisição GET leve para acordar a API (ponto sem autenticação)
    await apiClient.get('/jogos');

    if (__DEV__) {
      console.log('🔥 [warmUpApi] API acordada com sucesso!');
    }
  } catch (error) {
    // Garante que o erro é do tipo AxiosError
    if (axios.isAxiosError(error)) {
      if (__DEV__) {
        if (error.code === 'ECONNABORTED') {
          console.warn('⚠️ [warmUpApi] Timeout ao tentar acordar a API (pode estar iniciando).');
        } else {
          console.warn('⚠️ [warmUpApi] Erro ao acordar a API:', error.message);
        }
      }
    } else {
      // Caso ocorra outro tipo de erro inesperado
      if (__DEV__) {
        console.warn('⚠️ [warmUpApi] Erro inesperado ao acordar a API.');
      }
    }
  }
}
