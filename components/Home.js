import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import WorkoutList from './WorkoutList.js';
import WorkoutDetail from './WorkoutDetail.js';
import WorkoutLog from './WorkoutLog.js';
import CardioScreen from './Cardio.js';
import CardioLog from './CardioLog.js';

const Stack = createStackNavigator();

export default function({exercises, popUpWaifu}) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{popUpWaifu}}
      />
      <Stack.Screen
        name="WorkoutList"
        component={WorkoutList}
        initialParams={{exercises}}
      />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
      <Stack.Screen name="WorkoutLog" component={WorkoutLog} />
      <Stack.Screen name="Cardio" component={CardioScreen} />
      <Stack.Screen name="CardioLog" component={CardioLog} />
    </Stack.Navigator>
  );
}

function HomeScreen({route, navigation}) {
  return (
    <View contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('WorkoutList')}>
        <Text style={styles.text}> Workout </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('Cardio')}>
        <Text style={styles.text}> Cardio </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          route.params.popUpWaifu({
            dialogue: 'asdfasdf',
            gems: 10,
          });
        }}>
        <Text style={styles.text}> Waifu </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fed14dff',
  },
  body: {backgroundColor: '#fed14dff'},
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#ffa880ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 40, color: '#fed14dff'},
});
