import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../color'

const styles = StyleSheet.create({
  //home
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  circle: {
    margin: 10,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: COLORS.bgPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color: COLORS.textTitle,
    textTransform: 'uppercase',
  },
  //WorkoutList
  content: {
    backgroundColor: COLORS.bgPrimary,
    width: '100%',
  },
  titleText: {
    color: COLORS.textTitle,
    fontSize: 20,
    margin: 5,
  },
  filtersEq: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8C404',
  },
  filtersMus: {
    padding: 0,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa175',
  },
  bigIcon: {
    width: 40,
    height: 40,
  },
  filterEq: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary,
  },
  filterMus: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgHighlight,
  },
  none: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  //WorkoutLog
});

  export default styles;
