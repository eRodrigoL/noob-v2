// components/Splash.tsx
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@theme/index';

const Splash: React.FC = () => {
  const { colors, fontFamily, fontSizes } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundBase,
      }}
    >
      <ActivityIndicator size="large" color={colors.textOnBase} />
      <Text
        style={{
          marginTop: 20,
          fontFamily,
          fontSize: fontSizes.base,
          color: colors.textOnBase,
        }}
      >
        Carregando...
      </Text>
    </View>
  );
};

export default Splash;
