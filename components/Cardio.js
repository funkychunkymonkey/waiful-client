import * as React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Loading from './Loading.js';
import utils from '../utils.js';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';

export default function CardioScreen({navigation}) {
  const [currentRun, setCurrentRun] = useState(null);
  const [panel, setPanel] = useState('LOADING');
  const [location, setLocation] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      utils.getRun().then(data => {
        if (data === null) {
          setPanel('WAITING');
        } else {
          setPanel('RUNNING');
          setCurrentRun(data);
        }
      });
      return () => {
        setPanel('LOADING');
        setCurrentRun(null);
      };
    }, []),
  );
  switch (panel) {
    case 'LOADING':
      return <Loading />;
    case 'WAITING':
      return <NotRunning />;
    case 'RUNNING':
      return <Running />;
    case 'RESULT':
      return <Result />;
  }
  return currentRun ? <Running /> : <NotRunning />;

  /******** PANELS ********/

  function NotRunning() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.circle} onPress={() => startRun()}>
          <Text style={styles.text}> Start </Text>
        </TouchableOpacity>
        <Button title="View Run Log" onPress={() => goLogs()} />
      </View>
    );
  }
  function Running() {
    useFocusEffect(() => {
      requestLocationPermission();
    }, []);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 400,
            width: 400,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <MapView
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
            initialRegion={location}>
            <Marker
              coordinate={{latitude: 35.657966, longitude: 139.727667}}
              title="Team Funky Chunky Monkey"
              description="Waiful HQ"
            />
          </MapView>
        </View>
        <TouchableOpacity style={styles.circle} onPress={() => endRun()}>
          <Text style={styles.text}> Stop </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function Result() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.text}>
          You ran {currentRun.distance}m! Good work.
        </Text>
        <Button title="Good work!" onPress={() => endResult()} />
      </View>
    );
  }

  /******** UTILS ********/

  function startRun() {
    setPanel('LOADING');
    utils.startRun().then(data => {
      setPanel('RUNNING');
      setCurrentRun(data);
    });
  }
  function endRun() {
    const data = [];
    const distance = 2000;
    setPanel('LOADING');
    utils.stopRun(distance, data).then(data => {
      setPanel('RESULT');
      setCurrentRun(data);
    });
  }
  function endResult() {
    setCurrentRun(null);
    setPanel('WAITING');
  }
  function goLogs() {
    navigation.navigate('CardioLog');
  }
  async function requestLocationPermission() {
    if (Platform.OS === 'ios') {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('IOS' + response);
      if (response === 'granted') {
        console.log('hooray!');
        locateCurrentPosition();
      }
    } else {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android' + response);
      locateCurrentPosition();
    }
  }
  function locateCurrentPosition() {
    Geolocation.getCurrentPosition(position => {
      console.log(JSON.stringify(position));

      let initialLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocation(initialLocation);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 50,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#ffa880ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //for map
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  //map
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
