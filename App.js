import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './components/home/Index';
import GachaScreen from './components/gacha/Index';
import SettingsScreen from './components/settings/Index';
import CollectionScreen from './components/collection/Index';
import WaifuOverlay from './components/WaifuOverlay';
import Splash from './components/Splash';

import COLORS from './color';
import {useZ} from './zustand';

const Tab = createBottomTabNavigator();
const App: () => React$Node = () => {
  const [loading, setLoading] = useState(true);

  const overlayIsVisible = useZ(z => z.overlayIsVisible);
  const overlayOptions = useZ(z => z.overlayOptions);
  const setOverlayIsVisible = useZ(z => z.setOverlayIsVisible);

  const reloadExercises = useZ(z => z.reloadExercises);
  const exercises = useZ(z => z.exercises);

  const reloadUser = useZ(z => z.reloadUser);
  const waifus = useZ(z => z.waifus);

  useEffect(() => {
    reloadExercises();
    reloadUser();
  }, []);

  useEffect(() => {
    if (waifus !== null && exercises !== null) {
      setLoading(false);
    }
  }, [waifus, exercises]);

  if (loading) return <Splash />;

  return (
    <>
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
            name="Gacha"
            component={GachaScreen}
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
