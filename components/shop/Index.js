import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Container, Header, View, Body, Title} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Series from './Series.js';
import SeriesCharacters from './SeriesCharacters.js';

import COLORS from '../../color';
import {useZ} from '../../zustand';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  return (
    <Stack.Navigator
      initialRouteName="Shop"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bgPrimary,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
        },
        headerTintColor: COLORS.textTitle,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
      }}>
      <Stack.Screen name="Series" component={Series} />
      <Stack.Screen
        name="SeriesCharacters"
        component={SeriesCharacters}
        initialParams={{series: null}}
      />
    </Stack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  // top bar & screen
  header: {
    backgroundColor: COLORS.bgPrimary,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
});
