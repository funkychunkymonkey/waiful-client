/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/home/HomeScreen';
import GachaScreen from './screens/gacha/GachaScreen';
import SettingsScreen from './screens/settings/SettingsScreen';
import CollectionScreen from './screens/collection/Collection';
import Navigator from './routes/homeStack';

const Home: () => React$Node = () => {
  const navigator = new Navigator();
  return <>{navigator}</>;
};

const Settings: () => React$Node = () => {
  const screen = new SettingsScreen();
  return <>{screen}</>;
};
const Collection: () => React$Node = () => {
  const screen = new CollectionScreen();
  return <>{screen}</>;
};
const Gacha: () => React$Node = () => {
  const screen = new GachaScreen();
  return <>{screen}</>;
};

const Tab = createBottomTabNavigator();
const Tabs: () => React$Node = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
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
        component={Collection}
        options={{
          tabBarLabel: 'Collection',
          tabBarIcon: ({color, size}) => (
            <Icon name="md-apps" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Gacha"
        component={Gacha}
        options={{
          tabBarLabel: 'Gacha',
          tabBarIcon: ({color, size}) => (
            <Icon name="gift-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
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
