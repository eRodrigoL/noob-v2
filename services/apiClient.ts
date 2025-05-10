// services/apiClient.ts
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Constants from 'expo-constants';

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

// ---
// 🧪 Exemplo de uso:

// 1. Importação
// import { apiClient } from '@services/apiClient';

// 2. Requisição GET (exemplo: buscar jogos públicos)
// const response = await apiClient.get('/jogos');

// 3. Requisição POST (exemplo: registrar usuário)
// const response = await apiClient.post('/usuarios', {
//   name: 'João da Silva',
//   email: 'joao@email.com',
// });

// 4. Tratamento de erro (exemplo com try/catch)
// try {
//   const response = await apiClient.get('/partidas');
//   usar utils/logger ('✅ Dados:', response.data);
// } catch (error) {
//   usar utils/logger ('❌ Erro ao buscar partidas:', error);
// }

// ---
