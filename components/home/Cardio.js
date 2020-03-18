import * as React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import NotRunning from './CardioNotRunning';
import Running from './CardioRunning';
import Loading from '../Loading';
import utils from '../../utils';

import Geolocation from '@react-native-community/geolocation';

import {useZ, useCardioZ} from '../../zustand';

export default function CardioScreen({navigation}) {
  const currentRun = useCardioZ(state => state.currentRun);
  const setCurrentRun = useCardioZ(state => state.setCurrentRun);
  const addCoords = useCardioZ(z => z.addCoords);

  const [panel, setPanel] = React.useState('LOADING');

  const incrementGems = useZ(z => z.incrementGems);
  const popUpWaifu = useZ(z => z.popUpWaifu);

  React.useEffect(() => {
    if (!currentRun) {
      setPanel('WAITING');
    } else {
      setPanel('RUNNING');
    }
  }, [currentRun]);

  function endRun() {
    setPanel('LOADING');
    utils.stopRun(currentRun).then(data => {
      setPanel('WAITING');
      setCurrentRun(null);
      navigation.navigate('CardioLog');
      incrementGems(data.gems);
      popUpWaifu({
        event: 'run:finished',
        gems: data.gems,
        auto: false,
      });
    });
  }

  function startRun() {
    setPanel('LOADING');
    utils.startRun().then(data => {
      setPanel('RUNNING');
      setCurrentRun(data);
      Geolocation.getCurrentPosition(position => {
        addCoords([position.coords.latitude, position.coords.longitude]);
        error => {
          console.log(error.code, error.message);
        };
      });
    });
  }

  switch (panel) {
    case 'LOADING':
      return <Loading />;
    case 'WAITING':
      return <NotRunning startRun={startRun} />;
    case 'RUNNING':
      return <Running endRun={endRun} />;
  }
  return <></>;
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
