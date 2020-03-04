import * as React from 'react';
import WorkoutScreen from '../workout/WorkoutScreen';
import {ScrollView} from 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default function HomeScreen({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.circle1}
        onPress={() => {
          navigation.navigate('WorkoutScreen');
        }}>
        <Text style={styles.text}> Workout </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle2}>
        <Text style={styles.text}> Cardio </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fed14dff',
  },
  circle1: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#ffa880ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle2: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#ffa880ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 40, color: '#fed14dff'},
});
