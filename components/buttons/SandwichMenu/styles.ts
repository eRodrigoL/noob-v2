import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

const { colors } = useTheme();

const { width: screenWidth } = Dimensions.get('window');

// Define a largura responsiva baseada na largura da tela
const modalWidth = screenWidth > 600 ? '30%' : '60%';

const stylesSandwichMenu = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
  modalContainer: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalView: {
    backgroundColor: colors.backgroundSemiHighlight,
    height: '100%',
    justifyContent: 'flex-start',
    padding: 20,
    width: modalWidth,
  },
});

export default stylesSandwichMenu;
