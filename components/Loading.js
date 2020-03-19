import * as React from 'react';
import {Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

import COLORS from '../color';

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        style={{height: 300}}
        autoPlay
        loop
        source={require('../assets/lottie/50-material-loader.json')}
        colorFilters={[
          {
            keypath: 'Shape Layer 1 Comp 1',
            color: COLORS.bgHighlight,
          },
        ]}
      />
      <Text style={{fontSize: 20}}>Loading...</Text>
    </View>
  );
}
