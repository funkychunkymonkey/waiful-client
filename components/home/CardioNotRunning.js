import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import COLORS from '../../color';
import {useZ} from '../../zustand';

export default function NotRunning({startRun}) {
  const popUpWaifu = useZ(z => z.popUpWaifu);
  useFocusEffect(
    React.useCallback(() => {
      popUpWaifu({
        event: 'run:waiting',
        auto: true,
      });
      return () => {};
    }, []),
  );
  return (
    <View style={styles.wrapper}>
      <View>
        <LottieView
          autoPlay
          loop
          source={require('../../assets/lottie/50-material-loader.json')}
          colorFilters={[
            {
              keypath: 'Shape Layer 1 Comp 1',
              color: COLORS.bgHighlight,
            },
          ]}
        />
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => startRun()}>
        <LinearGradient
          style={styles.startButton}
          colors={[COLORS.bgPrimary, COLORS.bgHighlight]}>
          <Icon name="running" size={100} color="#fff" />
          <Text style={styles.buttonText}> Start Running </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  //for map
  mapContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    marginTop: 125,
  },
  //map
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
