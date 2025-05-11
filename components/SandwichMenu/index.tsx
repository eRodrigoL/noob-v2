import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Modal, View, Animated, Dimensions, Pressable, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import stylesSandwichMenu from './styles';
import ButtonHighlight from '@components/ButtonHighlight';
import { ROUTES, ValidRoutes } from '@constants/index';
import { useTheme } from '@theme/index';
import { apiClient } from '@services/apiClient';
import { logger } from '@utils/logger';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

const SandwichMenu: React.FC<ModalProps> = ({ visible, onClose }) => {
  const { colors } = useTheme();
  const slideAnim = React.useRef(new Animated.Value(-width)).current;
  const [hasOpenMatch, setHasOpenMatch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Verifica se há usuário logado
  const checkAuthentication = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!userId && !!token);
    } catch (error) {
      logger.warn('[SandwichMenu] Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    }
  };

  // Verifica se há partidas em aberto
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

        const response = await apiClient.get(
          `/partidas/filtro?registrador=${userId}&fim=null`,
          config,
        );

        setHasOpenMatch(response.data.length > 0);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setHasOpenMatch(false);
        } else {
          logger.warn('[SandwichMenu] Erro na verificação de partidas:', error.message);
        }
      } else {
        logger.warn('[SandwichMenu] Erro desconhecido:', error);
      }
    }
  };

  // Logout do usuário
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'userId']);
      if (Platform.OS === 'web') {
        logger.log('[SandwichMenu] Logout realizado com sucesso.');
      } else {
        Alert.alert('Sucesso', 'Logout realizado com sucesso!');
      }
      setIsAuthenticated(false);
      onClose();
      router.push(ROUTES.USER.LOGIN);
    } catch (error) {
      logger.warn('[SandwichMenu] Erro ao realizar logout:', error);
    }
  };

  // Animação de entrada e saída do menu
  useEffect(() => {
    if (visible) {
      checkAuthentication();
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }).start(() => onClose());
    }
  }, [visible]);

  // Verifica partidas após confirmação de login
  useEffect(() => {
    if (isAuthenticated) {
      checkOpenMatches();
    }
  }, [isAuthenticated]);

  // Fecha o menu com animação
  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 500,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => onClose());
  };

  // Navega para uma rota e fecha o menu
  const handleNavigate = (path: ValidRoutes) => {
    handleClose();
    router.push(path);
  };

  // Lógica para botão "Jogar"
  const handlePlayPress = () => {
    handleClose();
    if (hasOpenMatch) {
      // TODO: Adicionar rota para finalizar partida
      // TODO: router.push('/matches/finish');
    } else {
      // TODO: Adicionar rota para finalizar partida
      // TODO: router.push('/matches/play');
    }
  };

  return (
    <Modal animationType="none" transparent visible={visible} onRequestClose={handleClose}>
      <Pressable onPress={handleClose} style={stylesSandwichMenu.modalContainer}>
        <Animated.View
          style={[
            stylesSandwichMenu.modalView,
            {
              transform: [{ translateX: slideAnim }],
              backgroundColor: colors.backgroundSemiHighlight,
            },
          ]}
        >
          <View style={stylesSandwichMenu.buttonContainer}>
            <ButtonHighlight title="Início" onPress={() => handleNavigate(ROUTES.HOME)} />
            {!isAuthenticated ? (
              <ButtonHighlight title="Login" onPress={() => handleNavigate(ROUTES.USER.LOGIN)} />
            ) : (
              <>
                <ButtonHighlight
                  title="Perfil"
                  onPress={() => {
                    // TODO: adicionar rota de perfil
                  }}
                />
                <ButtonHighlight
                  title="Configurações"
                  onPress={() => handleNavigate(ROUTES.USER.SETTINGS)}
                />
                <ButtonHighlight title="Jogar" onPress={handlePlayPress} />
                <ButtonHighlight title="Sair" onPress={handleLogout} />
              </>
            )}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default SandwichMenu;
