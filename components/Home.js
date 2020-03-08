import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import WorkoutList from './WorkoutList.js';
import WorkoutDetail from './WorkoutDetail.js';
import WorkoutLog from './WorkoutLog.js';
import CardioScreen from './Cardio.js';
import CardioLog from './CardioLog.js';

const Stack = createStackNavigator();

export default function({route, navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fed14d',
          borderBottomWidth: 0,
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
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
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetail}
        initialParams={{popUpWaifu: route.params.popUpWaifu}}
      />
      <Stack.Screen name="WorkoutLog" component={WorkoutLog} />
      <Stack.Screen name="Cardio" component={CardioScreen} />
      <Stack.Screen name="CardioLog" component={CardioLog} />
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
        <LinearGradient colors={['#fed14d', '#ffa880']} style={styles.circle}>
          <Icon name="dumbbell" size={100} color="#fff" />
          <Text style={styles.text}> Workout </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('Cardio')}>
        <LinearGradient colors={['#fed14d', '#ffa880']} style={styles.circle}>
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
    backgroundColor: '#fed14d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color: '#fff',
    textTransform: 'uppercase',
  },
});
