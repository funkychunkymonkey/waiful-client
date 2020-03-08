import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Loading from './Loading.js';
import utils from '../utils.js';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function CardioScreen({navigation, route}) {
  const [currentRun, setCurrentRun] = useState(null);
  const [panel, setPanel] = useState('LOADING');
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
      </View>
    );
  }
  function Running() {
    const [location, setLocation] = useState({});
    useFocusEffect(() => {
      Geolocation.getCurrentPosition(position => {
        console.log(position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.0125,
        }),
          error => {
            console.log(error.code, error.message);
          };
      });
    });
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
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
            region={location}>
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
      setPanel('WAITING');
      navigation.popToTop();
      navigation.navigate('CardioLog');
      route.params.popUpWaifu({
        dialogue: 'Great work!!',
        gems: data.gems,
        auto: false,
      });
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
