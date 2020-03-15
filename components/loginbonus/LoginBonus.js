import {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DailyDistance from './DailyDistance';
import {useZ} from '../../zustand';
import utils from '../../utils';

export default function LoginBonus() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [walk, setWalk] = useState(null);
  const LAST_LOGIN_DATE_KEY = '@lastLoginDate';
  const incrementGems = useZ(z => z.incrementGems);

  useEffect(() => {
    function handleAppStateChange(nextAppState) {
      if (nextAppState === 'active') {
        const today = getToday();

        getDataOrDefault(LAST_LOGIN_DATE_KEY, today.toISOString()).then(
          data => {
            if (data !== today.toISOString()) {
              DailyDistance({setWalk, today});
            }
            storeData(LAST_LOGIN_DATE_KEY, today.toISOString());
          },
        );
      }
      setAppState(nextAppState);
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [appState]);

  useEffect(() => {
    if (walk !== null) {
      utils
        .addBonus(walk.km)
        .then(result => {
          incrementGems(result);
          return result;
        })
        .then(gem => {
          alert(
            `Today's bonus! You walked about ${walk.km}km yesterday. You got ${gem} gems!`,
          );
        });
    }
  }, [walk]);

  function getToday() {
    const now = new Date();
    // ToDo: remove now.getHours() and now.getMinutes(), this is for testing.
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
    );
  }
  async function storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('error');
    }
  }
  async function getDataOrDefault(key, defaultValue) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null && value !== undefined) {
        return value;
      } else {
        return defaultValue;
      }
    } catch (e) {
      console.error('error');
      return defaultValue;
    }
  }

  return {appState};
}
