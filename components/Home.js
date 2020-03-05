import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import WorkoutScreen from './Workout.js';
import CardioScreen from './Cardio.js';

const Stack = createStackNavigator();

export default function({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Workout" component={WorkoutScreen} />
      <Stack.Screen name="Cardio" component={CardioScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen({navigation}) {
  return (
    <View contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('Workout')}>
        <Text style={styles.text}> Workout </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('Cardio')}>
        <Text style={styles.text}> Cardio </Text>
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
