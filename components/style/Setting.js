import {StyleSheet} from 'react-native';
import COLORS from '../../color';

const styles = StyleSheet.create({
  //Index
  container: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
  },
  body: {
    backgroundColor: COLORS.bgSecondary,
  },
  body2: {
    backgroundColor: COLORS.bgSecondary,
    width: '100%',
    position: 'relative',
  },
  //Personalities
  content1: {
    padding: 10,
    alignItems: 'center',
  },
  content2: {
    backgroundColor: COLORS.textSecondary,
    alignItems: 'center',
    padding: 10,
  },
  text1: {
    color: COLORS.textTitle,
    fontSize: 20,
    marginTop: 10,
  },
  //Series
  text: {
    fontSize: 20,
    padding: 20,
  },
  add: {
    fontSize: 15,
    backgroundColor: COLORS.bgPrimary,
    padding: 15,
    margin: 5,
    position: 'absolute',
    right: 10,
  },
  hand: {
    right: -25,
    top: -18,
    width: 300,
    position: 'absolute',
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  item: {flex: 7},
  trashcan: {
    flex: 3,
    paddingRight: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default styles;