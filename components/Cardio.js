import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import Loading from './Loading.js';
import utils from '../utils.js';
import COLORS from '../color';

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
      return (
        <NotRunning startRun={startRun} popUpWaifu={route.params.popUpWaifu} />
      );
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

function NotRunning({startRun, popUpWaifu}) {
  useFocusEffect(
    React.useCallback(() => {
      popUpWaifu({
        dialogue: 'Ganbare!',
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
          source={require('../src/50-material-loader.json')}
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

function Running({location, routeData, endRun}) {
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
          <Marker
            coordinate={{latitude: 35.657966, longitude: 139.727667}}
            title="Team Funky Chunky Monkey"
            description="Waiful HQ"
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
function Result({currentRun, endResult}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        You ran {currentRun.distance}m! Good work.
      </Text>
      <Button title="Good work!" onPress={() => endResult()} />
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
