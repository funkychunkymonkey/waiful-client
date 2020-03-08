import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import WorkoutList from './WorkoutList.js';
import WorkoutDetail from './WorkoutDetail.js';
import WorkoutLog from './WorkoutLog.js';
import CardioScreen from './Cardio.js';
import CardioLog from './CardioLog.js';
import COLORS from '../color';

const Stack = createStackNavigator();

export default function({route, navigation}) {
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
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{popUpWaifu: route.params.popUpWaifu}}
      />
      <Stack.Screen
        name="WorkoutList"
        component={WorkoutList}
        initialParams={{exercises: route.params.exercises}}
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
        name="WorkoutDetail"
        component={WorkoutDetail}
        initialParams={{popUpWaifu: route.params.popUpWaifu}}
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
        initialParams={{popUpWaifu: route.params.popUpWaifu}}
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

function HomeScreen({route, navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      route.params.popUpWaifu({
        dialogue: 'Welcome back!',
        auto: true,
      });
      return () => {};
    }, []),
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('WorkoutList')}>
        <LinearGradient
          colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
          style={styles.circle}>
          <Icon name="dumbbell" size={100} color="#fff" />
          <Text style={styles.text}> Workout </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('Cardio')}>
        <LinearGradient
          colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
          style={styles.circle}>
          <Icon name="running" size={100} color="#fff" />
          <Text style={styles.text}> Cardio </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  circle: {
    margin: 10,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: COLORS.bgPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color: COLORS.textTitle,
    textTransform: 'uppercase',
  },
});
