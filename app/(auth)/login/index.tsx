import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles, useTheme } from '@theme/index';
import { ROUTES } from '@constants/index';
import { ButtonHighlight, ButtonSemiHighlight, Header } from '@components/index';
import { logger } from '@utils/logger';

// verificar: precisa manter a API acordada em todas as telas

const Login: React.FC = () => {
  const router = useRouter(); // Hook para manipular rotas
  const { colors, fontFamily, fontSizes } = useTheme();

  const [apelido, setApelido] = useState(''); // Estado para armazenar o apelido do usuário
  const [senha, setSenha] = useState(''); // Estado para armazenar a senha do usuário

  // Função de login, que verifica as credenciais do usuário
  const handleLogin = async () => {
    // Verifica se os campos de apelido e senha foram preenchidos
    if (!apelido || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.'); // Exibe um alerta caso os campos estejam vazios
      return;
    }

    const apelidoCorrigido = `@${apelido}`;

    try {
      // Faz uma requisição para o backend para autenticação
      const response = await axios.post('https://api-noob-react.onrender.com/api/login', {
        apelido: apelidoCorrigido,
        senha,
      });

      // Se o status da resposta for 200, login é bem-sucedido
      if (response.status === 200) {
        const { token, usuario, msg } = response.data; // Extrai o token, informações do usuário e mensagem da resposta

        // Armazena o token e o ID do usuário no armazenamento local
        await AsyncStorage.multiSet([
          ['token', token],
          ['userId', usuario.id], // Armazena o ID do usuário
        ]);

        Alert.alert('Sucesso', msg, [
          {
            text: 'OK',
            onPress: () => {
              router.replace(ROUTES.TEST);
            },
          },
        ]);
      }
    } catch (error) {
      logger.error('Erro no login', error);
      Alert.alert('Erro', 'Apelido ou senha incorreta. Tente novamente!');
    }
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.backgroundBase }]}>
      <Header title="Login" />
      <View>
        {/* Título da página com ícone */}
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

        {/* Campo de texto para inserção do apelido */}
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
          placeholder="Insira seu nome de usário"
          value={`@${apelido}`}
          onChangeText={(text) => {
            const sanitizedText = text.replace('@', ''); // Remove qualquer '@'
            setApelido(sanitizedText);
          }}
          autoCapitalize="none"
        />

        {/* Campo de texto para inserção da senha */}
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
          secureTextEntry // Define o campo como senha, ocultando o texto
          value={senha}
          onChangeText={setSenha} // Atualiza o estado da senha conforme o usuário digita
          placeholder=""
        />

        {/* Botão para realizar o login */}
        <ButtonHighlight
          title="Entrar"
          onPress={() => {
            handleLogin();
          }}
        />

        {/* Botão para cancelar o login */}
        <ButtonSemiHighlight
          title="Voltar"
          onPress={() => {
            router.back();
          }}
        />

        {/* Texto e link para redirecionar para a tela de cadastro */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily, fontSize: fontSizes.base, color: colors.textOnBase }}>
            Ainda não tem uma conta?
          </Text>

          {/* Trocar por link e criar uma cor de texto para substituir backgroundHighlight */}
          <Text style={{ fontFamily, fontSize: fontSizes.base, color: colors.backgroundHighlight }}>
            Cadastre-se
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
