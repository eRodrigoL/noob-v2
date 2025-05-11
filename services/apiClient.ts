// services/apiClient.ts
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { logger } from '@utils/logger';
import { ROUTES } from '@constants/routes';

// Recupera a URL base da API definida em app.config.js (extra.apiBaseUrl)
const baseURL = Constants.expoConfig?.extra?.apiBaseUrl;

// Verifica se a variável foi definida corretamente
if (!baseURL) {
  // Se estiver indefinida, interrompe a execução e avisa o desenvolvedor
  throw new Error(
    '❌ A variável de ambiente API_BASE_URL não foi definida no app.config.js ou .env',
  );
}

// Cria uma instância Axios personalizada para uso em toda a aplicação
export const apiClient = axios.create({
  baseURL, // Base das requisições
  timeout: 30000, // Tempo máximo de espera para uma resposta (30s)
  headers: {
    'Content-Type': 'application/json', // Tipo padrão do corpo das requisições
  },
});

// Aplica o mecanismo de "retry" (repetição automática caso falhe)
axiosRetry(apiClient, {
  retries: 5, // Tenta novamente até 5 vezes
  retryDelay: axiosRetry.exponentialDelay, // Atraso cresce exponencialmente (ex: 1s, 2s, 4s)
  retryCondition: (error) =>
    // Repete se for erro de rede ou timeout
    error.code === 'ECONNABORTED' || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

// 🛡️ Interceptor global para tratamento de token expirado
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.msg?.toLowerCase?.() ?? '';

      const isTokenError = msg.includes('token inválido') || msg.includes('jwt');

      if (isTokenError) {
        logger.warn('🔒 Token inválido detectado. Redirecionando para login...');
        Toast.show({
          type: 'error',
          text1: 'Sessão expirada',
          text2: 'Faça login novamente.',
        });

        await AsyncStorage.multiRemove(['token', 'userId']);
        router.replace(ROUTES.HOME); // rota de redirecionamento caso token tenha expirado
      }
    }

    return Promise.reject(error);
  },
);
