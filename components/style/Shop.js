import {StyleSheet} from 'react-native';
import COLORS from '../../color';

const styles = StyleSheet.create({
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
  row: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    shadowColor: '#000000ff',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 2},
    elevation: 1,
    shadowRadius: 2,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  characterRow: {
    alignItems: 'center',
  },
  rowImage: {
    width: 100,
  },
  characterRowImage: {
    width: 80,
    height: 80,
  },
  rowContent: {
    padding: 10,
    flex: 1,
  },
  rowContentTitle: {
    fontSize: 18,
  },
  rowContentDescription: {
    fontSize: 12,
  },
  rowRight: {
    padding: 10,
    alignItems: 'center',
  },
});

export default styles;
