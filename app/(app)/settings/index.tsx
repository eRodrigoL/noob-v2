// app/settings/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '@store/useSettingsStore';
import { theme, typography, globalStyles } from '@theme/index';
import { ButtonSemiHighlight, ButtonHighlight, HeaderLayout } from '@components/index';

export default function SettingsScreen() {
  const router = useRouter();

  // Ações e estados globais
  const { setFontFamily, setColorScheme, fontFamily, colorScheme, fontSizeMultiplier } =
    useSettingsStore();

  // Estados locais
  const [localFontFamily, setLocalFontFamily] = useState(fontFamily);
  const [localColorScheme, setLocalColorScheme] = useState(colorScheme);
  const [localFontSizeMultiplier, setLocalFontSizeMultiplier] = useState(fontSizeMultiplier);

  useEffect(() => {
    setLocalFontFamily(fontFamily);
    setLocalColorScheme(colorScheme);
    setLocalFontSizeMultiplier(fontSizeMultiplier);
  }, [fontFamily, colorScheme, fontSizeMultiplier]);

  const previewColors = theme[localColorScheme];
  const previewFontFamily = typography.fonts[localFontFamily as keyof typeof typography.fonts];

  const fontSizes = {
    giant: typography.sizes.base * typography.sizes.giantMultiplier * localFontSizeMultiplier,
    large: typography.sizes.base * typography.sizes.largeMultiplier * localFontSizeMultiplier,
    base: typography.sizes.base * localFontSizeMultiplier,
    small: typography.sizes.smallMultiplier * localFontSizeMultiplier,
  };

  const fontOptions = [
    { key: 'arial', value: 'Arial' },
    { key: 'times', value: 'Times New Roman' },
    { key: 'roboto', value: 'Roboto' },
  ];

  const themeOptions = [
    { key: 'light', value: 'Claro' },
    { key: 'dark', value: 'Escuro' },
    { key: 'daltonic', value: 'Daltônico' },
  ];

  const applyChanges = () => {
    setFontFamily(localFontFamily);
    setColorScheme(localColorScheme);
    useSettingsStore.setState({ fontSizeMultiplier: localFontSizeMultiplier });
  };

  const restoreLocalDefaults = () => {
    setLocalFontFamily('arial');
    setLocalColorScheme('light');
    setLocalFontSizeMultiplier(1);
  };

  const handleIncrease = () => {
    if (localFontSizeMultiplier < 1.5) {
      setLocalFontSizeMultiplier((prev) => prev + 0.1);
    }
  };

  const handleDecrease = () => {
    if (localFontSizeMultiplier > 0.8) {
      setLocalFontSizeMultiplier((prev) => prev - 0.1);
    }
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: previewColors.backgroundBase }]}>
      {/* Componente Header (cabeçalho) */}
      <HeaderLayout
        title="Tela de Teste"
        fontFamilyOverride={previewFontFamily}
        fontSizeOverride={fontSizes.base}
        textColorOverride={previewColors.textOnHighlight}
        backgroundColorOverride={previewColors.backgroundHighlight}
      >
        {/* Seleção de Fonte */}
        <Text
          style={{
            fontFamily: previewFontFamily,
            fontSize: fontSizes.base,
            color: previewColors.textOnBase,
          }}
        >
          Fonte do corpo:
        </Text>

        <SelectList
          setSelected={setLocalFontFamily}
          data={fontOptions}
          defaultOption={fontOptions.find((f) => f.key === localFontFamily)}
          search={false}
          boxStyles={{ marginBottom: 20 }}
          dropdownTextStyles={{
            fontFamily: previewFontFamily,
            fontSize: fontSizes.base,
            color: previewColors.textOnBase,
          }}
          inputStyles={{
            fontFamily: previewFontFamily,
            fontSize: fontSizes.base,
            color: previewColors.textOnBase,
          }}
        />

        {/* Ajuste de Tamanho da Fonte */}
        <Text
          style={{
            fontFamily: previewFontFamily,
            fontSize: fontSizes.base,
            color: previewColors.textOnBase,
          }}
        >
          Tamanho da fonte:
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 20,
          }}
        >
          <ButtonSemiHighlight title="A-" onPress={handleDecrease} />

          <ButtonSemiHighlight title="A+" onPress={handleIncrease} />
        </View>

        {/* Seleção de Tema de Cores */}
        <Text
          style={{
            fontFamily: previewFontFamily,
            fontSize: fontSizes.base,
            color: previewColors.textOnBase,
          }}
        >
          Tema de cores:
        </Text>

        <SelectList
          setSelected={setLocalColorScheme}
          data={themeOptions}
          defaultOption={themeOptions.find((t) => t.key === localColorScheme)}
          search={false}
          boxStyles={{ marginBottom: 20 }}
          dropdownTextStyles={{
            fontFamily: previewFontFamily,
            fontSize: fontSizes.base,
            color: previewColors.textOnBase,
          }}
          inputStyles={{
            fontFamily: previewFontFamily,
            fontSize: fontSizes.base,
            color: previewColors.textOnBase,
          }}
        />

        {/* Botões de ação */}
        <ButtonHighlight
          title="Confirmar mudanças"
          onPress={applyChanges}
          fontFamilyOverride={previewFontFamily}
          fontSizeOverride={fontSizes.base}
          colorOverride={previewColors.textOnHighlight}
          backgroundColorOverride={previewColors.backgroundHighlight}
        />

        <ButtonSemiHighlight
          title="Restaurar padrão"
          onPress={restoreLocalDefaults}
          fontFamilyOverride={previewFontFamily}
          fontSizeOverride={fontSizes.base}
          colorOverride={previewColors.textOnSemiHighlight}
          backgroundColorOverride={previewColors.backgroundSemiHighlight}
        />

        <ButtonSemiHighlight
          title="Voltar"
          onPress={() => router.back()}
          fontFamilyOverride={previewFontFamily}
          fontSizeOverride={fontSizes.base}
          colorOverride={previewColors.textOnSemiHighlight}
          backgroundColorOverride={previewColors.backgroundSemiHighlight}
        />
      </HeaderLayout>
    </View>
  );
}
