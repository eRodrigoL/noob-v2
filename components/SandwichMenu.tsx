// components/SandwichMenu.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Modal,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTheme, stylesSandwichMenu } from '@theme/index';
import ButtonHighlight from '@components/ButtonHighlight';
import { ROUTES } from '@constants/index';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

const SandwichMenu: React.FC<ModalProps> = ({ visible, onClose }) => {
  const slideAnim = React.useRef(new Animated.Value(-width)).current;
  const [hasOpenMatch, setHasOpenMatch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();

  // Verifica autenticação do usuário
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

  // Verifica se há partidas abertas
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

  // Faz logout do usuário
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'userId']);
      Alert.alert('Sucesso', 'Logout realizado com sucesso!');
      setIsAuthenticated(false);
      onClose();
      // TODO: adicionar rota de listagem de jogos
      // router.push('/boardgame/list');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  // Cuida da abertura/fechamento do menu e autenticação
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

  // Verifica partidas abertas somente depois de autenticado
  useEffect(() => {
    if (isAuthenticated) {
      checkOpenMatches();
    }
  }, [isAuthenticated]);

  // Fecha o menu
  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 500,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => onClose());
  };

  // Navega para a rota
  const handleNavigate = (path: (typeof ROUTES)[keyof typeof ROUTES]) => {
    handleClose();
    router.push(path);
  };

  // Ao clicar em Jogar
  const handlePlayPress = () => {
    handleClose();
    if (hasOpenMatch) {
      // TODO: adicionar rota para finalizar partida
      // router.push('/matches/finish');
    } else {
      // TODO: adicionar rota para jogar nova partida
      // router.push('/matches/play');
    }
  };

  return (
    <Modal animationType="none" transparent visible={visible} onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={stylesSandwichMenu.modalContainer}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                stylesSandwichMenu.modalView,
                {
                  transform: [{ translateX: slideAnim }],
                  backgroundColor: colors.backgroundSemiHighlight,
                  width: width > 600 ? '30%' : '60%', // ← Responsividade
                },
              ]}
            >
              <View style={stylesSandwichMenu.buttonContainer}>
                <ButtonHighlight title="Início" onPress={() => handleNavigate(ROUTES.HOME)} />
                {!isAuthenticated ? (
                  <ButtonHighlight
                    title="Login"
                    onPress={() => {
                      // TODO: adicionar rota de login
                      // handleNavigate('/user/login');
                    }}
                  />
                ) : (
                  <>
                    <ButtonHighlight
                      title="Perfil"
                      onPress={() => {
                        // TODO: adicionar rota de perfil
                        // handleNavigate('/user/profile');
                      }}
                    />
                    <ButtonHighlight title="Jogar" onPress={handlePlayPress} />
                    <ButtonHighlight title="Sair" onPress={handleLogout} />
                  </>
                )}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SandwichMenu;
