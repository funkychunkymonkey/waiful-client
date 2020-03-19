import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  //CardioNotRunning and CardioRunning
  wrapper: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 50,
  },
  startButton: {
    width: 300,
    height: 300,
    borderRadius: 200 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    position: 'absolute',
    zIndex: 10,
    bottom: 10,
    left: 10,
    width: 150,
    height: 150,
    borderRadius: 200 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 28,
    color: '#fff',
    textTransform: 'uppercase',
  },
  //map container
  mapContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    marginTop: 125,
  },
  //map
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  //CardioLog
  log: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  logMapContainer: {
    width: wp('100%'),
    height: hp('40%'),
  },
  none: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});

export default styles;