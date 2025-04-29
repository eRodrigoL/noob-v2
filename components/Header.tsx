// components/Header.tsx
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTheme, stylesHeader } from '@theme/index';
import { SandwichMenu, ButtonHighlight } from '@components/index';
// import { ROUTES } from '@constants/index'; // Rotas

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { colors, fontFamily, fontSizes } = useTheme();
  // const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [hasOpenMatch, setHasOpenMatch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!userId && !!token);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    }
  };

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

        const response = await axios.get(
          `https://noob-api-1.onrender.com/api/partidas/filtro?registrador=${userId}&fim=null`,
          config,
        );
        setHasOpenMatch(response.data.length > 0);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setHasOpenMatch(false);
        } else {
          console.error('Erro ao verificar partidas em aberto:', error);
        }
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      checkAuthentication();
      return () => {
        setModalVisible(false); // Sempre fecha o modal ao desfocar
      };
    }, []),
  );

  useEffect(() => {
    if (isAuthenticated) {
      checkOpenMatches();
    }
  }, [isAuthenticated]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSettingsPress = () => {
    if (hasOpenMatch) {
      // TODO: adicionar rota para finalizar partida
      // router.push('/matches/finish');
    } else {
      // TODO: adicionar rota para iniciar nova partida
      // router.push('/matches/play');
    }
  };

  return (
    <View style={[stylesHeader.headerContainer, { backgroundColor: colors.backgroundHighlight }]}>
      {/* Botão de menu sanduíche */}
      <ButtonHighlight title="☰" onPress={handleOpenModal} />

      {/* Modal do menu */}
      <SandwichMenu visible={modalVisible} onClose={handleCloseModal} />

      {/* Título centralizado */}
      <Text
        style={[
          stylesHeader.title,
          {
            fontFamily,
            fontSize: fontSizes.base,
            color: colors.textOnHighlight,
          },
        ]}
      >
        {title}
      </Text>

      {/* Botão 🎲 à direita (se autenticado) */}
      <View style={stylesHeader.iconPlaceholder}>
        {isAuthenticated && <ButtonHighlight title="🎲" onPress={handleSettingsPress} />}
      </View>
    </View>
  );
};

export default Header;
