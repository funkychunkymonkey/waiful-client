import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../../color';
import {useCardioZ} from '../../zustand';

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
          <Marker
            coordinate={{latitude: 35.657966, longitude: 139.727667}}
            title="Team Funky Chunky Monkey HQ"
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
