// hooks/useWarmUpApi.ts
import { apiClient } from '@services/apiClient';
import axios from 'axios';
import { logger } from '@utils/logger';

/**
 * Envia uma requisição GET leve para "acordar" a API assim que o app for iniciado.
 */
export async function warmUpApi(): Promise<void> {
  try {
    await apiClient.get('/jogos');
    logger.log('🔥 [warmUpApi] API acordada com sucesso!');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        logger.warn('⚠️ [warmUpApi] Timeout ao tentar acordar a API (provavelmente iniciando).');
      } else {
        logger.warn('⚠️ [warmUpApi] Erro ao acordar a API:', error.message);
      }
    } else {
      logger.warn('⚠️ [warmUpApi] Erro inesperado ao acordar a API.', error);
    }
  }
}
