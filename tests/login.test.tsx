// __tests__/Login.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Importação do NavigationContainer
import Login from '../app/(auth)/login';
import Toast from 'react-native-toast-message';
import { apiClient } from '@services/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('@services/apiClient', () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  multiSet: jest.fn(),
}));

describe('Login Screen', () => {
  it('mostra erro se os campos estiverem vazios', async () => {
    const { getByText } = render(
      <NavigationContainer>  {/* Envolva o componente com NavigationContainer */}
        <Login />
      </NavigationContainer>
    );
    const loginButton = getByText('Entrar');
    fireEvent.press(loginButton);

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Erro',
      text2: 'Por favor, preencha todos os campos.',
    });
  });

  it('faz login com sucesso e armazena dados', async () => {
    (apiClient.post as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: {
        token: 'fake-token',
        usuario: { id: '123' },
        msg: 'Login realizado com sucesso!',
      },
    });

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>  {/* Envolva o componente com NavigationContainer */}
        <Login />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText('usuário'), '@teste');
    fireEvent.changeText(getByPlaceholderText('senha'), '123456');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/login', {
        apelido: '@teste',
        senha: '123456',
      });
      expect(AsyncStorage.multiSet).toHaveBeenCalledWith([
        ['token', 'fake-token'],
        ['userId', '123'],
      ]);
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Login realizado com sucesso!',
      });
    });
  });

  it('mostra erro se API retornar erro', async () => {
    (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Credenciais inválidas'));

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>  {/* Envolva o componente com NavigationContainer */}
        <Login />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText('usuário'), '@errado');
    fireEvent.changeText(getByPlaceholderText('senha'), '123');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: 'Apelido ou senha incorreta. Tente novamente!',
      });
    });
  });
});
