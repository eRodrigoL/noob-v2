import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme, globalStyles } from '@theme/index';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  // Usa o hook useTheme para obter a estilização dinânica configurada globalmente
  const { colors, fontFamily, fontSizes } = useTheme();

  return (
    <TouchableOpacity
      style={[globalStyles.button, { backgroundColor: colors.backgroundSemiHighlight }]}
      onPress={onPress}
    >
      <Text
        style={[
          globalStyles.textCentered,
          {
            fontFamily,
            fontSize: fontSizes.base,
            color: colors.textOnHighlight,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
