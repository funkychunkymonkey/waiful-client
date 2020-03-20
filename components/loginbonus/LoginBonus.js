import React from 'react';
import {AppState} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DailyDistance from './DailyDistance';
import {useZ} from '../../zustand';
import utils from '../../utils';

export default function LoginBonus({loading}) {
  const [walk, setWalk] = React.useState(null);
  const [doCheckWalk, setDoCheckWalk] = React.useState(false);
  const LAST_LOGIN_DATE_KEY = '@lastLoginDate';
  const incrementGems = useZ(z => z.incrementGems);
  const popUpWaifu = useZ(z => z.popUpWaifu);
  React.useEffect(() => {
    if (walk !== null) {
      utils
        .addBonus(walk.km)
        .then(result => {
          incrementGems(result);
          return result;
        })
        .then(gem => {
          popUpWaifu({
            gems: gem,
            dialogue: `Today's bonus! You walked about ${walk.km}km yesterday. You got ${gem} Ikigai!`,
          });
        });
    }
  }, [walk]);

  function getToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
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

  AppState.addEventListener('change', checkWalk);
  React.useEffect(checkWalk, [loading]);

  function checkWalk() {
    if (loading) return;
    setDoCheckWalk(true);
  }

  React.useEffect(() => {
    if (doCheckWalk) {
      const today = getToday();
      getDataOrDefault(LAST_LOGIN_DATE_KEY, today.toISOString()).then(data => {
        if (data !== today.toISOString()) {
          DailyDistance({setWalk, today});
        }
        storeData(LAST_LOGIN_DATE_KEY, today.toISOString());
        setDoCheckWalk(false);
      });
    }
  }, [doCheckWalk]);

  return <></>;
}
