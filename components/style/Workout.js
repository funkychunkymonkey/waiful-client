import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../color';

const styles = StyleSheet.create({
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
  //WorkoutDetails
  wrapper: {
    padding: 10,
    marginBottom: 10,
  },
  headerGradient: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
    alignContent: 'center',
  },
  headerHead: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerButt: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: COLORS.textTitle,
    fontSize: 24,
  },
  form: {
    backgroundColor: COLORS.bgSecondary,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formItem: {
    flex: 1,
  },
  formIcon: {
    marginRight: 10,
  },
  description: {
    backgroundColor: 'white',
    padding: 20,
  },
  descriptionText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
});

export default styles;