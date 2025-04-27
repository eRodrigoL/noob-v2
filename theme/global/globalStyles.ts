// Importa a função StyleSheet do React Native para criar estilos
import { StyleSheet } from 'react-native';

// Define um objeto de estilos globais usando StyleSheet.create
const globalStyles = StyleSheet.create({
  // Botão genérico base
  button: {
    alignItems: 'center', // Centraliza o conteúdo horizontalmente dentro do botão
    borderRadius: 5, // Define o raio da borda para cantos arredondados
    justifyContent: 'center', // Centraliza o conteúdo verticalmente dentro do botão
    margin: 5, // Margem de 20 unidades de todos os lados
    padding: 10, // Adiciona um preenchimento interno de 10 unidades em todos os lados
  },

  // Quadro ou card genérico com sombra leve
  card: {
    borderRadius: 8,
    elevation: 2, // sombra no Android
    marginVertical: 10,
    padding: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // Container princípal das telas
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
  },

  // Texto centralizado (exp.: botões secundários, descrições de imagens e gráficos, etc.)
  textCentered: {
    fontWeight: 'normal',
    textAlign: 'center',
  },

  // Texto centralizado e em negrito (usado para títulos, destaque, botões principais)
  textCenteredBold: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Texto justificado e normal (exp.: textos simples, descrições, textos longos, etc.)
  textJustified: {
    fontWeight: 'normal',
    textAlign: 'justify',
  },

  // Texto justificado e em negrito (exp.: subtítulos, etc.)
  textJustifiedBoldItalic: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
});

// Exporta o objeto de estilos globais para ser usado em outros componentes
export default globalStyles;
