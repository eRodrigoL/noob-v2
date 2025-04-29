// app/test/index.tsx
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme, globalStyles } from '@theme/index';
import { ROUTES } from '@constants/index';
import { ButtonHighlight } from '@components/index';
// import Header from "@components/Header"; // Componente cabeçalho

export default function TestScreen() {
  const { colors, fontSizes, fontFamily } = useTheme();
  const router = useRouter();

  return (
    // Container principal da tela com estilo global e cor de fundo definida pelo tema atual
    <View style={[globalStyles.container, { backgroundColor: colors.backgroundBase }]}>
      {/* Componente Header (cabeçalho) */}
      {/* <Header title="Tela de Teste" /> */}

      {/* Texto gigante com fonte, tamanho e cor definidos pelo tema */}
      <Text
        style={{
          fontFamily,
          fontSize: fontSizes.giant,
          color: colors.textOnBase,
        }}
      >
        Texto Gigante
      </Text>

      {/* Texto grande com fonte, tamanho e cor definidos pelo tema */}
      <Text
        style={{
          fontFamily,
          fontSize: fontSizes.large,
          color: colors.textOnBase,
        }}
      >
        Texto Grande
      </Text>

      {/* Texto padrão com fonte, tamanho e cor definidos pelo tema */}
      <Text
        style={{
          fontFamily,
          fontSize: fontSizes.base,
          color: colors.textOnBase,
        }}
      >
        Texto Padrão
      </Text>

      {/* Texto pequeno com fonte, tamanho e cor definidos pelo tema */}
      <Text
        style={{
          fontFamily,
          fontSize: fontSizes.small,
          color: colors.textOnBase,
        }}
      >
        Texto Pequeno
      </Text>

      {/* Botão voltar */}
      <ButtonHighlight title="Ir para Configurações" onPress={() => router.push(ROUTES.SETTINGS)} />
    </View>
  );
}
