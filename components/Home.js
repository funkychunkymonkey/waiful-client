import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.text}> Workout </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
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
