import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme, globalStyles } from '@theme/index';

// Define as props, agora incluindo overrides opcionais
interface ButtonSemiHighlightProps {
  title: string;
  onPress: () => void;
  fontFamilyOverride?: string;
  fontSizeOverride?: number;
  colorOverride?: string;
  backgroundColorOverride?: string;
}

const ButtonSemiHighlight: React.FC<ButtonSemiHighlightProps> = ({
  title,
  onPress,
  fontFamilyOverride,
  fontSizeOverride,
  colorOverride,
  backgroundColorOverride,
}) => {
  // Usa o hook useTheme para obter o estilo dinâmico global
  const { colors, fontFamily, fontSizes } = useTheme();

  return (
    <TouchableOpacity
      style={[
        globalStyles.button,
        { backgroundColor: backgroundColorOverride || colors.backgroundSemiHighlight },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          globalStyles.textCentered,
          {
            fontFamily: fontFamilyOverride || fontFamily,
            fontSize: fontSizeOverride || fontSizes.base,
            color: colorOverride || colors.textOnHighlight,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonSemiHighlight;
