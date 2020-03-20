import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../color';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  // top bar & screen
  header: {
    backgroundColor: COLORS.bgPrimary,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    position: 'absolute',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
  wrapper: {
    backgroundColor: COLORS.bgSecondary,
  },

  screen: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  // content positioners
  columnContainer: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  // gacha panel
  gachaPanel: {
    position: 'relative',
    zIndex: 10,
    padding: 10,
    alignSelf: 'center',
    top: 80,
    width: 290,
  },
  gachaPanelHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  gachaPanelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  gachaPanelButtonInactive: {
    padding: 20,
    opacity: 0.9,
  },
  gachaPanelBody: {
    backgroundColor: '#fffe',
    padding: 10,
    alignItems: 'center',
  },
  gachaPanelText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    textAlign: 'center',
  },
  gachaPanelHeaderTitle: {
    color: COLORS.textTitle,
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  gachaPanelHeaderSubtitle: {
    color: COLORS.textTitle,
    fontSize: 18,
    textAlign: 'center',
  },
  // gacha image
  gachaImage: {
    width: '100%',
    height: 400,
    position: 'absolute',
    left: 100,
  },
  bg: {
    width: '100%',
    position: 'absolute',
    top: -500,
    //justifyContent: 'center',
  },
});

export default styles;
