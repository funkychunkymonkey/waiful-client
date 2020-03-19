import {StyleSheet} from 'react-native';
import COLORS from '../../color';

const styles = StyleSheet.create({
//Series
  container: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
  },
  body: {
    backgroundColor: COLORS.bgSecondary,
  },
  content1: {
    padding: 10,
    alignItems: 'center',
  },
  text1: {
    color: COLORS.textTitle,
    fontSize: 20,
    marginTop: 10,
  },
});

export default styles;