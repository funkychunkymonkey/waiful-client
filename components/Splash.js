import * as React from 'react';
import {View, Image, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

export default function Splash() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../assets/loading.gif')}
        resizeMode="contain"
        style={{width: Dimensions.get('window').width}}
      />
      <LottieView
        autoPlay
        loop
        source={require('../assets/lottie/15260-pushups.json')}
        style={{top: 50}}
      />
    </View>
  );
}
