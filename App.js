import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from 'react-native-orientation-locker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';

import HomeScreen from './components/home/Index';
import GachaScreen from './components/gacha/Index';
import ShopScreen from './components/shop/Index';
import SettingsScreen from './components/settings/Index';
import CollectionScreen from './components/collection/Index';
import WaifuOverlay from './components/WaifuOverlay';
import Splash from './components/Splash';
import LoginBonus from './components/loginbonus/LoginBonus';

import COLORS from './color';
import {useZ, useCardioZ} from './zustand';

const Tab = createBottomTabNavigator();
const App: () => React$Node = () => {
  const [loading, setLoading] = useState(true);

  const overlayIsVisible = useZ(z => z.overlayIsVisible);
  const overlayOptions = useZ(z => z.overlayOptions);
  const setOverlayIsVisible = useZ(z => z.setOverlayIsVisible);

  const reloadExercises = useZ(z => z.reloadExercises);
  const exercises = useZ(z => z.exercises);
  const user = useZ(z => z.user);
  const reloadUser = useZ(z => z.reloadUser);
  const waifus = useZ(z => z.waifus);

  const [cardioWatcher, setCardioWatcher] = useState(null);
  const isRunning = useCardioZ(z => z.isRunning);
  const setLocation = useCardioZ(z => z.setLocation);
  const addCoords = useCardioZ(z => z.addCoords);
  const setCurrentRun = useCardioZ(z => z.setCurrentRun);

  AsyncStorage.removeItem('currentRun', null);
  React.useEffect(() => {
    let cardioCounter = 0;
    if (isRunning) {
      if (cardioWatcher !== null) return;
      cardioCounter = 0;
      const watchId = Geolocation.watchPosition(
        function({coords}) {
          if (cardioCounter >= 24) {
            cardioCounter = 0;
            addCoords([coords.latitude, coords.longitude]);
          } else {
            cardioCounter++;
          }
          setLocation([coords.latitude, coords.longitude]);
        },
        error => console.log('[watchPosition error]', error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 1,
        },
      );
      setCardioWatcher(watchId);
    } else {
      Geolocation.clearWatch(cardioWatcher);
      setCardioWatcher(null);
    }
  }, [isRunning]);

  useEffect(() => {
    Orientation.lockToPortrait();
    reloadExercises();
    reloadUser();
  }, []);

  useEffect(() => {
    if (waifus !== null && exercises !== null) {
      setLoading(false);
    }
  }, [waifus, exercises]);

  useEffect(() => {
    if (user !== null) {
      AsyncStorage.getItem('currentRun')
        .then(data => (data ? JSON.parse(data) : null))
        .then(data => {
          setCurrentRun(data ? data : user.currentRun);
        });
    }
  }, [user]);

  if (loading) return <Splash />;

  return (
    <>
      <LoginBonus loading={loading} />
      <WaifuOverlay
        options={overlayOptions}
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
              paddingTop: 5,
              backgroundColor: COLORS.bgPrimary,
            },
            labelStyle: {
              fontSize: 16,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
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
            name="Omikuji"
            component={GachaScreen}
            options={{
              tabBarLabel: 'Omikuji',
              tabBarIcon: ({color, size}) => (
                <Icon name="heart-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Shop"
            component={ShopScreen}
            options={{
              tabBarLabel: 'Shop',
              tabBarIcon: ({color, size}) => (
                <Icon name="shopping" color={color} size={size} />
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
