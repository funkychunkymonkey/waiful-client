import * as React from 'react';
import {StyleSheet, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './Home.js';
import WorkoutList from './WorkoutList.js';
import WorkoutDetail from './WorkoutDetail.js';
import WorkoutLog from './WorkoutLog.js';
import WorkoutCustom from './WorkoutCustom.js';
import CardioScreen from './Cardio.js';
import CardioLog from './CardioLog.js';

import COLORS from '../../color';

const Stack = createStackNavigator();

export default function({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="WorkoutList"
        component={WorkoutList}
        options={{
          title: 'Exercises',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('WorkoutLog')}
              title="Logs"
              color={COLORS.textTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="WorkoutCustom"
        component={WorkoutCustom}
        options={{
          title: 'Custom Workout',
        }}
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetail}
        options={{
          title: 'Workout',
        }}
      />
      <Stack.Screen
        name="WorkoutLog"
        component={WorkoutLog}
        options={{
          title: 'Your Workouts',
        }}
      />
      <Stack.Screen
        name="Cardio"
        component={CardioScreen}
        options={{
          title: 'Run',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('CardioLog')}
              title="Logs"
              color={COLORS.textTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CardioLog"
        component={CardioLog}
        options={{
          title: 'Your Runs',
        }}
      />
    </Stack.Navigator>
  );
}
