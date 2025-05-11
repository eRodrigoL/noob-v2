import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SettingsScreen from '../app/(app)/settings/index'; 
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


jest.mock('expo-router', () => ({
    useRouter: () => ({
        back: jest.fn(),
    }),
}));

jest.mock('react-native-toast-message', () => ({
    show: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
}));

jest.mock('@store/useSettingsStore', () => {
    const actual = jest.requireActual('@store/useSettingsStore');
    return {
        ...actual,
        useSettingsStore: Object.assign(
            () => ({
                fontFamily: 'arial',
                colorScheme: 'light',
                fontSizeMultiplier: 1,
                setFontFamily: jest.fn(),
                setColorScheme: jest.fn(),
            }),
            {
                setState: jest.fn(), // ← ESSENCIAL AQUI
            }
        ),
    };
});

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ msg: 'Mudanças atualizadas!' }),
    })
) as jest.Mock;

// 🔁 Função utilitária para renderizar com NavigationContainer
const renderWithNavigation = (ui: React.ReactElement) => {
    return render(<NavigationContainer>{ui}</NavigationContainer>);
};

describe('SettingsScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('altera fonte, tema, tamanho e aplica mudanças com sucesso', async () => {
        (AsyncStorage.getItem as jest.Mock).mockImplementation(async (key) => {
            if (key === 'userId') return '123';
            if (key === 'token') return 'fake-token';
            return null;

        });

        const { getByText } = renderWithNavigation(<SettingsScreen />);

        fireEvent.press(getByText('A+'));
        fireEvent.press(getByText('A-'));
        fireEvent.press(getByText('Confirmar mudanças'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                'https://noob-api-1.onrender.com/api/usuarios/preferencias/123',
                expect.objectContaining({
                    method: 'PUT',
                    headers: expect.objectContaining({
                        Authorization: 'Bearer fake-token',
                    }),
                })
            );
        }, { timeout: 2000 });

        expect(Toast.show).toHaveBeenCalledWith({
            type: 'success',
            text1: 'Sucesso',
            text2: 'Mudanças atualizadas!',
        });
    });

    it('restaura configurações padrões', () => {
        const { getByText } = renderWithNavigation(<SettingsScreen />);
        fireEvent.press(getByText('Restaurar padrão'));
    });

    it('mostra erro se não encontrar userId ou token', async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

        const { getByText } = renderWithNavigation(<SettingsScreen />);
        fireEvent.press(getByText('Confirmar mudanças'));

        await waitFor(() => {
            expect(fetch).not.toHaveBeenCalled();
        });
    });

    it('mostra erro se a API retornar erro', async () => {
        (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
            if (key === 'userId') return Promise.resolve('123');
            if (key === 'token') return Promise.resolve('fake-token');
            return Promise.resolve(null);
        });

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ msg: 'Erro inesperado ao salvar' }),
        });

        const { getByText } = renderWithNavigation(<SettingsScreen />);
        fireEvent.press(getByText('Confirmar mudanças'));

        await waitFor(() => {
            expect(Toast.show).toHaveBeenCalledWith({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro inesperado ao salvar',
            });
        });
    });
});




