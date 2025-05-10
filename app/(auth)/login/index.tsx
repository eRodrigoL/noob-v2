// app/login.tsx

import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { globalStyles, useTheme } from '@theme/index';
import { ROUTES } from '@constants/index';
import { ButtonHighlight, ButtonSemiHighlight, Header } from '@components/index';
import { apiClient } from '@services/apiClient';
import { logger } from '@utils/logger';

const Login: React.FC = () => {
  const router = useRouter();
  const { colors, fontFamily, fontSizes } = useTheme();

  // Estados locais para armazenar os dados de login
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');

  /**
   * Realiza o login do usuário, enviando as credenciais para a API.
   * Se for bem-sucedido, armazena o token e redireciona para a tela principal.
   */
  const handleLogin = async () => {
    // 🚫 Verifica se os campos foram preenchidos
    if (!apelido || !senha) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    // ✅ Garante que o apelido esteja no formato esperado (prefixado com "@")
    const apelidoCorrigido = `@${apelido}`;

    try {
      // ℹ️ Informa ao usuário que a API pode estar iniciando (Render gratuito)
      Toast.show({
        type: 'info',
        text1: 'Aguarde um momento',
        text2: 'Estamos iniciando o servidor...',
      });

      // 🔐 Envia os dados para autenticação
      const response = await apiClient.post('/login', {
        apelido: apelidoCorrigido,
        senha,
      });

      // ✅ Se a resposta for bem-sucedida (status 200), continua
      if (response.status === 200) {
        const { token, usuario, msg } = response.data;

        // 💾 Armazena o token JWT e o ID do usuário localmente
        await AsyncStorage.multiSet([
          ['token', token],
          ['userId', usuario.id],
        ]);

        // ✅ Notifica sucesso com a mensagem da API
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: msg,
        });

        // 🧭 Redireciona para a tela principal da aplicação
        router.replace(ROUTES.HOME);
      }
    } catch (error: unknown) {
      // ❌ Em caso de falha (ex: credenciais incorretas ou timeout)
      logger.error('Erro no login:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: 'Apelido ou senha incorreta. Tente novamente!',
      });
    }
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.backgroundBase }]}>
      {/* Cabeçalho customizado da tela */}
      <Header title="Login" />

      <View>
        {/* Título da aplicação */}
        <Text
          style={{
            fontFamily,
            fontSize: fontSizes.giant,
            textAlign: 'center',
            color: colors.textOnBase,
            marginBottom: 20,
          }}
        >
          Noob 🎲
        </Text>

        {/* Campo de apelido */}
        <Text style={{ fontFamily, fontSize: fontSizes.base, color: colors.textOnBase }}>
          Apelido:
        </Text>
        <TextInput
          style={{
            backgroundColor: colors.backgroundSemiHighlight,
            color: colors.textOnSemiHighlight,
            fontFamily,
            fontSize: fontSizes.base,
            borderRadius: 5,
            padding: 10,
            marginBottom: 16,
          }}
          placeholder="usuário"
          value={`@${apelido}`} // Exibe com o @, mas armazena sem ele
          onChangeText={(text) => setApelido(text.replace('@', ''))}
          autoCapitalize="none"
        />

        {/* Campo de senha */}
        <Text style={{ fontFamily, fontSize: fontSizes.base, color: colors.textOnBase }}>
          Senha:
        </Text>
        <TextInput
          style={{
            backgroundColor: colors.backgroundSemiHighlight,
            color: colors.textOnSemiHighlight,
            fontFamily,
            fontSize: fontSizes.base,
            borderRadius: 5,
            padding: 10,
            marginBottom: 16,
          }}
          secureTextEntry // Oculta os caracteres digitados
          value={senha}
          onChangeText={setSenha}
          placeholder="senha"
        />

        {/* Botão principal: login */}
        <ButtonHighlight title="Entrar" onPress={handleLogin} />

        {/* Botão secundário: voltar para a tela anterior */}
        <ButtonSemiHighlight title="Voltar" onPress={() => router.back()} />

        {/* Opção de cadastro (link futuro) */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily, fontSize: fontSizes.base, color: colors.textOnBase }}>
            Ainda não tem uma conta?
          </Text>
          <Text style={{ fontFamily, fontSize: fontSizes.base, color: colors.backgroundHighlight }}>
            Cadastre-se
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
