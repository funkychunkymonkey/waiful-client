import * as React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export default function Splash() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LottieView autoPlay loop source={require('../src/15260-pushups.json')} />
    </View>
  );
}
