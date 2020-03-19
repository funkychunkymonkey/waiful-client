import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import COLORS from '../../color';
import {useZ} from '../../zustand';
import styles from '../style/Cardio';

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
