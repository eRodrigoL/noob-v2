import { StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

const { colors, fontSizes, fontFamily } = useTheme();

// Estilos organizados alfabeticamente e com nomes claros
const stylesGameCard = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.backgroundBase,
    borderRadius: 12,
    elevation: 4,
    marginVertical: 10,
    padding: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '48%',
  },
  image: {
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
    width: 100,
  },
  rating: {
    color: colors.border,
    fontSize: fontSizes.small,
  },
  title: {
    color: colors.textOnBase,
    fontFamily: fontFamily,
    fontSize: fontSizes.base,
    textAlign: 'center',
  },
});

export default stylesGameCard;
