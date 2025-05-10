import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@theme/index';
import stylesHeader from './styles';
import SandwichMenu from '@components/SandwichMenu';
import ButtonHighlight from '@components/ButtonHighlight';
import { apiClient } from '@services/apiClient';
import { logger } from '@utils/logger';
import axios from 'axios';

interface HeaderProps {
  title: string;
  fontFamilyOverride?: string;
  fontSizeOverride?: number;
  textColorOverride?: string;
  backgroundColorOverride?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  fontFamilyOverride,
  fontSizeOverride,
  textColorOverride,
  backgroundColorOverride,
}) => {
  const { colors, fontFamily, fontSizes } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [hasOpenMatch, setHasOpenMatch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica se o usuário está autenticado com base no armazenamento local
  const checkAuthentication = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!userId && !!token);
    } catch (error) {
      logger.warn('[Header] Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    }
  };

  // Verifica se o usuário possui partidas em aberto
  const checkOpenMatches = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');

      if (userId && token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        };

        // ✅ Agora a URL vem da base + path via template string
        const response = await apiClient.get(
          `/partidas/filtro?registrador=${userId}&fim=null`,
          config,
        );

        setHasOpenMatch(response.data.length > 0);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          // Nenhuma partida em aberto
          setHasOpenMatch(false);
        } else {
          logger.warn('[Header] Erro ao verificar partidas abertas:', error.message);
        }
      } else {
        logger.warn('[Header] Erro desconhecido ao verificar partidas abertas:', error);
      }
    }
  };

  // Quando a tela entra em foco, verifica autenticação e reseta o modal
  useFocusEffect(
    React.useCallback(() => {
      checkAuthentication();
      return () => setModalVisible(false);
    }, []),
  );

  // Se autenticado, verifica se há partidas abertas
  useEffect(() => {
    if (isAuthenticated) {
      checkOpenMatches();
    }
  }, [isAuthenticated]);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleSettingsPress = () => {
    if (hasOpenMatch) {
      // TODO: Adicionar rota para finalizar partida
      // router.push('/matches/finish');
    } else {
      // TODO: Adicionar rota para iniciar nova partida
      // router.push('/matches/play');
    }
  };

  return (
    <View
      style={[
        stylesHeader.headerContainer,
        { backgroundColor: backgroundColorOverride || colors.backgroundHighlight },
      ]}
    >
      {/* Botão de menu sanduíche */}
      <ButtonHighlight
        title="☰"
        onPress={handleOpenModal}
        fontFamilyOverride={fontFamilyOverride}
        fontSizeOverride={fontSizeOverride}
        colorOverride={textColorOverride}
        backgroundColorOverride={backgroundColorOverride}
      />

      {/* Modal do menu */}
      <SandwichMenu visible={modalVisible} onClose={handleCloseModal} />

      {/* Título centralizado */}
      <Text
        style={[
          stylesHeader.title,
          {
            fontFamily: fontFamilyOverride || fontFamily,
            fontSize: fontSizeOverride || fontSizes.giant,
            color: textColorOverride || colors.textOnHighlight,
          },
        ]}
      >
        {title}
      </Text>

      {/* Botão 🎲 à direita (se autenticado) */}
      <View style={stylesHeader.iconPlaceholder}>
        {isAuthenticated && (
          <ButtonHighlight
            title="🎲"
            onPress={handleSettingsPress}
            fontFamilyOverride={fontFamilyOverride}
            fontSizeOverride={fontSizeOverride}
            colorOverride={textColorOverride}
            backgroundColorOverride={backgroundColorOverride}
          />
        )}
      </View>
    </View>
  );
};

export default Header;
