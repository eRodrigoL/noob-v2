import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme, globalStyles } from '@theme/index';

// Define as props, agora com opções de override para pré-visualização
interface ButtonHighlightProps {
  title: string;
  onPress: () => void;
  fontFamilyOverride?: string;
  fontSizeOverride?: number;
  colorOverride?: string;
  backgroundColorOverride?: string;
}

const ButtonHighlight: React.FC<ButtonHighlightProps> = ({
  title,
  onPress,
  fontFamilyOverride,
  fontSizeOverride,
  colorOverride,
  backgroundColorOverride,
}) => {
  const { colors, fontFamily, fontSizes } = useTheme();

  return (
    <TouchableOpacity
      style={[
        globalStyles.button,
        { backgroundColor: backgroundColorOverride || colors.backgroundHighlight },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          globalStyles.textCenteredBold,
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

export default ButtonHighlight;
