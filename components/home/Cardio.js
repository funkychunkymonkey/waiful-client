import * as React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Geolocation from '@react-native-community/geolocation';

import NotRunning from './CardioNotRunning';
import Running from './CardioRunning';
import Loading from '../Loading';
import utils from '../../utils';

import {useZ, useCardioZ} from '../../zustand';

export default function CardioScreen({navigation, route}) {
  const [currentRun, setCurrentRun] = React.useState(null);
  const [panel, setPanel] = React.useState('LOADING');
  const [location, setLocation] = React.useState(null);
  const [distance, setDistance] = React.useState(0);
  const [routeData, setRouteData] = React.useState([]);
  const popUpWaifu = useZ(z => z.popUpWaifu);

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

  function endRun() {
    setPanel('LOADING');
    utils.stopRun(distance, routeData).then(data => {
      setPanel('WAITING');
      setCurrentRun(data);
      navigation.navigate('CardioLog');
      popUpWaifu({
        dialogue: 'Great work!!',
        gems: data.gems,
        auto: false,
      });
    });
  }

  function startRun() {
    setPanel('LOADING');
    utils.startRun().then(data => {
      setCurrentRun(data);
      setPanel('RUNNING');
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

  function addCoords(coords) {
    setRouteData([...routeData, coords]);
    setDistance(distance + 25);
  }

  Geolocation.watchPosition(
    function({coords}) {
      if (panel !== 'RUNNING') return;
      addCoords([coords.latitude, coords.longitude]);
    },
    error => console.log('[watchPosition error]', error),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
      distanceFilter: 25,
    },
  );

  switch (panel) {
    case 'LOADING':
      return <Loading />;
    case 'WAITING':
      return <NotRunning startRun={startRun} />;
    case 'RUNNING':
      return (
        <Running endRun={endRun} location={location} routeData={routeData} />
      );
  }

  return currentRun ? <Running /> : <NotRunning />;
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
