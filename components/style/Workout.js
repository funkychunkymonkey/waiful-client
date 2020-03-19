import {StyleSheet} from 'react-native';
import COLORS from '../../color';

const styles = StyleSheet.create({
  //WorkoutList
  content: {
    backgroundColor: COLORS.bgSecondary,
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
    backgroundColor: COLORS.bgPrimary,
  },
  filtersMus: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textHighlight,
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
    backgroundColor: COLORS.textHighlight,
  },
  add: {
    padding: 6,
    marginLeft: 70,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 65,
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
  exerciseImage: {
    flex: 1,
    height: 100,
  },
  //WorkoutCustom
  formItemCustom: {
    flex: 1,
    marginBottom: 10,
  },
  filtersMusCustom: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa175',
  },
  InputDescription: {
    textAlignVertical: 'top',
  },
  //WorkoutLog
  log: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
});

export default styles;