// app/settings/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '@store/useSettingsStore';
import { theme, typography, globalStyles } from '@theme/index';
import { ButtonSemiHighlight, ButtonHighlight, Header } from '@components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

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

  const applyChanges = async () => {
    try {
      // Atualiza o estado global
      setFontFamily(localFontFamily);
      setColorScheme(localColorScheme);
      useSettingsStore.setState({ fontSizeMultiplier: localFontSizeMultiplier });

      // Recupera ID do usuário do AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');

      if (!userId || !token) {
        console.warn('ID do usuário ou token não encontrado.');
        return;
      }

      // Monta o corpo da requisição
      const body = {
        fontOption: localFontFamily,
        fontSize: localFontSizeMultiplier,
        theme: localColorScheme,
      };

      const response = await fetch(`https://noob-api-1.onrender.com/api/usuarios/preferencias/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Caso sua API exija autenticação
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        Toast.show({ type: 'error', text1: 'Erro', text2: result.msg || 'Falha ao salvar mudanças' });
      } else {
        Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Mudanças atualizadas!' });
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Erro inesperado ao salvar' });
      console.error(error);
    }
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
    <View
      style={[globalStyles.container, { backgroundColor: previewColors.backgroundBase }]}
      testID="settings-screen"
    >
      <Header
        title="Tela de Teste"
        fontFamilyOverride={previewFontFamily}
        fontSizeOverride={fontSizes.base}
        textColorOverride={previewColors.textOnHighlight}
        backgroundColorOverride={previewColors.backgroundHighlight}
        testID="header"
      />

      {/* Seleção de Fonte */}
      <Text
        testID="label-fonte"
        style={{
          fontFamily: previewFontFamily,
          fontSize: fontSizes.base,
          color: previewColors.textOnBase,
        }}
      >
        Fonte do corpo:
      </Text>

      <View testID='select-fonte'>
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
      </View>


      {/* Ajuste de Tamanho da Fonte */}
      <Text
        testID="label-tamanho-fonte"
        style={{
          fontFamily: previewFontFamily,
          fontSize: fontSizes.base,
          color: previewColors.textOnBase,
        }}
      >
        Tamanho da fonte:
      </Text>

      <View
        testID="controle-tamanho-fonte"
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
        }}
      >
        <ButtonSemiHighlight title="A-" onPress={handleDecrease} testID="btn-diminuir-fonte" />
        <ButtonSemiHighlight title="A+" onPress={handleIncrease} testID="btn-aumentar-fonte" />
      </View>

      {/* Seleção de Tema de Cores */}
      <Text
        testID="label-tema"
        style={{
          fontFamily: previewFontFamily,
          fontSize: fontSizes.base,
          color: previewColors.textOnBase,
        }}
      >
        Tema de cores:
      </Text>

      <View testID="select-tema">

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
      </View>


      {/* Botões de ação */}
      <ButtonHighlight
        title="Confirmar mudanças"
        onPress={applyChanges}
        fontFamilyOverride={previewFontFamily}
        fontSizeOverride={fontSizes.base}
        colorOverride={previewColors.textOnHighlight}
        backgroundColorOverride={previewColors.backgroundHighlight}
        testID="btn-confirmar"
      />

      <ButtonSemiHighlight
        title="Restaurar padrão"
        onPress={restoreLocalDefaults}
        fontFamilyOverride={previewFontFamily}
        fontSizeOverride={fontSizes.base}
        colorOverride={previewColors.textOnSemiHighlight}
        backgroundColorOverride={previewColors.backgroundSemiHighlight}
        testID="btn-restaurar"
      />

      <ButtonSemiHighlight
        title="Voltar"
        onPress={() => router.back()}
        fontFamilyOverride={previewFontFamily}
        fontSizeOverride={fontSizes.base}
        colorOverride={previewColors.textOnSemiHighlight}
        backgroundColorOverride={previewColors.backgroundSemiHighlight}
        testID="btn-voltar"
      />
    </View>
  );
}
