import * as React from 'react';

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
