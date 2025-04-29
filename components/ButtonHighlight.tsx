import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme, globalStyles } from '@theme/index';

interface ButtonHighlightProps {
  title: string;
  onPress: () => void;
}

const ButtonHighlight: React.FC<ButtonHighlightProps> = ({ title, onPress }) => {
  // Usa o hook useTheme para obter a estilização dinânica configurada globalmente
  const { colors, fontFamily, fontSizes } = useTheme();

  return (
    <TouchableOpacity
      style={[globalStyles.button, { backgroundColor: colors.backgroundHighlight }]}
      onPress={onPress}
    >
      <Text
        style={[
          globalStyles.textCenteredBold,
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

export default ButtonHighlight;
