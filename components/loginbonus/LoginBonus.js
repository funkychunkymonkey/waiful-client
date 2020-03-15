import {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DailyDistance from './DailyDistance';
import {useZ} from '../../zustand';

export default function LoginBonus() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [walk, setWalk] = useState(null);
  const DATE_KEY = '@firstLoginDate';
  const incrementGems = useZ(z => z.incrementGems);

  useEffect(() => {
    function handleAppStateChange(nextAppState) {
      if (nextAppState === 'active') {
        console.log('App has come to the foreground!');

        const nowAdj = getNow();

        getData(DATE_KEY).then(data => {
          if (data !== JSON.stringify(nowAdj)) {
            console.log(`Today's bonus! It is ${nowAdj} today.`);
            DailyDistance({setWalk, nowAdj});
          } else {
            console.log('Bonus is nothing...');
          }
          storeData(DATE_KEY, JSON.stringify(nowAdj));
        });
      }
      setAppState(nextAppState);
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [appState]);

  useEffect(() => {
    if (walk !== null) {
      alert(`Today's bonus! You walked about ${walk.km}km yesterday.`);
    }
  }, [walk]);

  function getNow() {
    const now = new Date();
    // ToDo: remove now.getMinutes(), this is for testing.
    return [now.getFullYear(), now.getMonth(), now.getDate(), now.getMinutes()];
  }
  async function storeData(name, data) {
    try {
      await AsyncStorage.setItem(name, data);
    } catch (e) {
      console.error('error');
    }
  }
  async function getData(name) {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null && value !== undefined) {
        return value;
      } else {
        return JSON.stringify(getNow());
      }
    } catch (e) {
      console.error('error');
      return JSON.stringify(getNow());
    }
  }

  return {appState};
}
