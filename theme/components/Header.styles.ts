import { StyleSheet } from 'react-native';

const stylesHeader = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    padding: 0,
    zIndex: 1,
  },
  iconPlaceholder: {
    alignItems: 'center',
    width: 55,
  },
  menuButton: {
    padding: 10,
  },
  settingsButton: {
    padding: 10,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default stylesHeader;
