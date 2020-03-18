import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../../color';
import styles from '../style/Cardio';

export default function Running({endRun, location, routeData}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.mapContainer}>
        <MapView
          showsUserLocation={true}
          followsUserLocation={true}
          route
          style={styles.map}
          region={location}>
          <MapView.Polyline
            coordinates={routeData.map(x => ({
              latitude: x[0],
              longitude: x[1],
            }))}
            strokeColor={'#f00'}
            strokeWidth={4}
          />
        </MapView>
      </View>
      <TouchableOpacity style={styles.stopButton} onPress={() => endRun()}>
        <LinearGradient
          style={styles.stopButton}
          colors={[COLORS.bgPrimary + '66', COLORS.bgHighlight + 'ee']}>
          <Icon name="male" size={40} color="#fff" />
          <Text style={styles.buttonText}> Stop </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
