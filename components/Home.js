// import * as React from 'react';
// import {StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';

// export default function Home() {
//   // const goWorkout =
//   return (
//     <ScrollView contentContainerStyle={styles.container} style={styles.body}>

/* <TouchableOpacity style={styles.circle}>
  <Text style={styles.text}> Workout </Text>
</TouchableOpacity>; */

//       <Workout />
//       <TouchableOpacity style={styles.circle}>
//         <Text style={styles.text}> Cardio </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }
import * as React from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import WorkoutScreen from './Workout';
import CardioScreen from './Cardio';

const Workout: () => React$Node = () => {
  return <WorkoutScreen />;
};
const Cardio: () => React$Node = () => {
  return <CardioScreen />;
};
const Stack = createStackNavigator();

function Home() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Workout" component={Workout} />
      <Stack.Screen name="Cardio" component={Cardio} />
    </Stack.Navigator>
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
export default Home;
