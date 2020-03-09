import * as React from 'react';
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

export default function CardioScreen({navigation, route}) {
  const [currentRun, setCurrentRun] = React.useState(null);
  const [panel, setPanel] = React.useState('LOADING');
  const [location, setLocation] = React.useState(null);
  const [routeData, setRouteData] = React.useState([]);
  const [distance, setDistance] = React.useState(0);

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

  React.useEffect(() => {
    if (panel === 'RUNNING') {
      Geolocation.watchPosition(
        // SUCCESS CALLBACK
        function({coords}) {
          addCoords([coords.latitude, coords.longitude]);
        },
        // error callback
        error => console.log('[watchPosition error]', error),
        // options
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 25,
        },
      );
    }
  }, [panel]);

  function addCoords(coords) {
    setRouteData(state => [...state, coords]);
    setDistance(state => state + 25);
  }

  switch (panel) {
    case 'LOADING':
      return <Loading />;
    case 'WAITING':
      return <NotRunning startRun={startRun} />;
    case 'RUNNING':
      return (
        <Running location={location} routeData={routeData} endRun={endRun} />
      );
    case 'RESULT':
      return <Result endResult={endResult} currentRun={currentRun} />;
  }

  return currentRun ? <Running /> : <NotRunning />;

  /******** UTILS ********/

  function startRun() {
    setPanel('LOADING');
    utils.startRun().then(data => {
      setPanel('RUNNING');
      setCurrentRun(data);
    });
    Geolocation.getCurrentPosition(position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        distanceTravelled: 0,
        prevLatLng: {},
      });
      error => {
        console.log(error.code, error.message);
      };
    });
  }

  function endRun() {
    setPanel('LOADING');
    utils.stopRun(distance, routeData).then(data => {
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

/******** PANELS ********/

function NotRunning({startRun}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity style={styles.circle} onPress={() => startRun()}>
        <Text style={styles.text}> Start </Text>
      </TouchableOpacity>
    </View>
  );
}

function Running({location, routeData, endRun}) {
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
function Result({currentRun, endResult}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.text}>
        You ran {currentRun.distance}m! Good work.
      </Text>
      <Button title="Good work!" onPress={() => endResult()} />
    </View>
  );
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
