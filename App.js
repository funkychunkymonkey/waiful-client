import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './components/Home';
import GachaScreen from './components/Gacha';
import SettingsScreen from './components/Settings';
import CollectionScreen from './components/Collection';
import WaifuOverlay from './components/WaifuOverlay';
import Splash from './components/Splash';

import utils from './utils.js';
import COLORS from './color';

const Tab = createBottomTabNavigator();
const App: () => React$Node = () => {
  const [exercises, setExercises] = useState([]);
  const [waifus, setWaifus] = useState([]);
  const [loading, setLoading] = useState(true);

  const [overlayKey, setOverlayKey] = React.useState(0);
  const [overlayIsVisible, setOverlayIsVisible] = React.useState(false);
  const [overlayOptions, setOverlayOptions] = React.useState({});

  useEffect(() => {
    Promise.all([reloadExercises(), reloadWaifus()]).then(() =>
      setLoading(false),
    );
  }, []);

  if (loading) return <Splash />;

  async function reloadExercises() {
    setExercises((await utils.getExercises()).slice(0, 100));
  }
  async function reloadWaifus() {
    setWaifus(await utils.getWaifus());
  }
  function popUpWaifu(options) {
    // generate waifu
    let waifu = null;
    if (options.gacha) waifu = options.gacha;
    else {
      const faves = waifus.filter(x => x.isFavorite);
      waifu = faves.length
        ? faves[Math.floor(Math.random() * faves.length)]
        : null;
    }
    // if it's a generic dialogue with no waifu, return immediately
    if (!options.gems && !options.gacha && !waifu) return;
    // otherwise pop
    setOverlayKey(overlayKey + 1);
    setOverlayIsVisible(true);
    setOverlayOptions({
      ...options,
      waifu,
    });
  }

  return (
    <>
      <WaifuOverlay
        options={overlayOptions}
        key={overlayKey}
        rerender={overlayKey}
        onClose={() => {
          setOverlayIsVisible(false);
        }}
        isVisible={overlayIsVisible}
      />
      <NavigationContainer options={{}}>
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#000',
            inactiveTintColor: '#fff',
            activeBackgroundColor: COLORS.bgPrimary,
            inactiveBackgroundColor: COLORS.bgPrimary,
            style: {
              borderTopWidth: 0,
              paddingTop: 10,
              backgroundColor: COLORS.bgPrimary,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{
              exercises,
              popUpWaifu,
            }}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Collection"
            component={CollectionScreen}
            options={{
              tabBarLabel: 'Collection',
              tabBarIcon: ({color, size}) => (
                <Icon name="grid" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Gacha"
            component={GachaScreen}
            initialParams={{
              popUpWaifu,
              reloadWaifus,
            }}
            options={{
              tabBarLabel: 'Gacha',
              tabBarIcon: ({color, size}) => (
                <Icon name="gift-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({color, size}) => (
                <Icon name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
