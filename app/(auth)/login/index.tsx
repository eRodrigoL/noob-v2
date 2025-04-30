import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, globalStyles } from '@theme/index';
import { ButtonSemiHighlight, ButtonHighlight, Header } from '@components/index';
import Constants from 'expo-constants';
import { logger } from '@utils/logger';

const Login: React.FC = () => {
  const router = useRouter();
  const { colors, fontFamily, fontSizes } = useTheme();
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!apelido || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const apelidoCorrigido = `@${apelido}`;
    const apiUrl = Constants.expoConfig?.extra?.apiBaseUrl;

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        apelido: apelidoCorrigido,
        senha,
      });

      if (response.status === 200) {
        const { token, usuario, msg } = response.data;

        await AsyncStorage.multiSet([
          ['token', token],
          ['userId', usuario.id],
        ]);

        Alert.alert('Sucesso', msg, [
          {
            text: 'OK',
            onPress: () => {
              router.push('/'); // TODO: ajustar rota de redirecionamento após login
            },
          },
        ]);
      }
    } catch (error) {
      logger.error('Erro no login', error);
      Alert.alert('Erro', 'Apelido ou senha incorretos. Tente novamente!');
    }
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.backgroundBase }]}>
      <Header title="Login" />

      <View style={{ padding: 16 }}>
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
          placeholder="@usuario"
          placeholderTextColor={colors.textOnSemiHighlight}
          value={`@${apelido}`}
          onChangeText={(text) => setApelido(text.replace('@', ''))}
          autoCapitalize="none"
        />

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
          placeholder="••••••••"
          placeholderTextColor={colors.textOnSemiHighlight}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <ButtonHighlight title="Entrar" onPress={handleLogin} />
        <ButtonSemiHighlight title="Voltar" onPress={() => router.back()} />

        <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'center' }}>
          <Text style={{ fontFamily, color: colors.textOnBase }}>Ainda não tem uma conta?</Text>
          <Text
            style={{
              marginLeft: 6,
              color: colors.textOnHighlight,
              textDecorationLine: 'underline',
              fontFamily,
            }}
            onPress={() => {
              // TODO: definir rota de cadastro
              // router.push('/user/register');
            }}
          >
            Cadastre-se
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
