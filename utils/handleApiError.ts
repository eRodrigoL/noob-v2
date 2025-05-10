// utils/handleApiError.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { logger } from './logger';

/**
 * Trata erros de requisições à API.
 * Se o erro for "Token inválido!", remove token e redireciona para login.
 */
export async function handleApiError(error: unknown): Promise<void> {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    logger.error('❌ Erro ao aplicar mudanças de estilo:', error);
    logger.error('📨 Resposta detalhada da API:', responseData);

    const mensagem = responseData?.msg || '';
    const isTokenInvalido = mensagem.toLowerCase().includes('token inválido');

    if (isTokenInvalido) {
      Toast.show({
        type: 'error',
        text1: 'Sessão expirada',
        text2: 'Faça login novamente.',
      });

      await AsyncStorage.multiRemove(['token', 'userId']);
      router.replace('/login');
    }
  } else {
    logger.error('❌ Erro desconhecido ao acessar a API:', error);
  }
}
