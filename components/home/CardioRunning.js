import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../../color';
import {useCardioZ} from '../../zustand';
import styles from '../style/Cardio';

export default function Running({endRun}) {
  const location = useCardioZ(z => z.location);
  const currentRun = useCardioZ(z => z.currentRun);
  const [routeData, setRouteData] = React.useState([]);

  React.useEffect(() => {
    const temp =
      currentRun && currentRun.data
        ? currentRun.data.map(x => ({
            latitude: x[0],
            longitude: x[1],
          }))
        : [];
    if (location) {
      temp.push({
        latitude: location[0],
        longitude: location[1],
      });
    }
    setRouteData(temp);
  }, [location]);
  return (
    <View style={styles.wrapper}>
      <View style={styles.mapContainer}>
        <MapView
          showsUserLocation={true}
          followsUserLocation={true}
          route
          style={styles.map}>
          <MapView.Polyline
            coordinates={routeData}
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
