import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './components/Home';
import GachaScreen from './components/Gacha';
import SettingsScreen from './components/Settings';
import CollectionScreen from './components/Collection';
import WaifuOverlay from './components/WaifuOverlay';

import utils from './utils.js';

const Tab = createBottomTabNavigator();
const App: () => React$Node = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const [overlayKey, setOverlayKey] = React.useState(0);
  const [overlayIsVisible, setOverlayIsVisible] = React.useState(false);
  const [overlayDialogue, setOverlayDialogue] = React.useState('');
  const [overlayGems, setOverlayGems] = React.useState(0);

  useEffect(() => {
    utils.getExercises().then(data => {
      setLoading(false);
      setExercises(data);
    });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  function popUpWaifu(options) {
    setOverlayKey(overlayKey + 1);
    setOverlayIsVisible(true);
    setOverlayDialogue(options.dialogue || '');
    setOverlayGems(options.gems || 0);
    // generate waifu => get a list of all favorited waifus => pick a random one
  }

  function Home() {
    return <HomeScreen exercises={exercises} popUpWaifu={popUpWaifu} />;
  }

  return (
    <>
      <WaifuOverlay
        isVisible={overlayIsVisible}
        dialogue={overlayDialogue}
        key={overlayKey}
        gems={overlayGems}
      />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#e91e63',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#fed14d',
            inactiveBackgroundColor: '#fed14d',
            style: {
              backgroundColor: '#fed14d',
            },
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
