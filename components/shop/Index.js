import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Series from './Series.js';
import SeriesCharacters from './SeriesCharacters.js';

import COLORS from '../../color';

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
