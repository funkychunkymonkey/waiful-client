import * as React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {useState} from 'react';
import utils from '../utils.js';

export default function WorkoutDetail({route, navigation}, y) {
  const exercise = route.params.exercise;
  const [reps, setReps] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = reps => {
    reps = Number(reps);
    if (isNaN(reps) || reps <= 1) return;
    setReps('');
    setLoading(true);
    utils.logExercise(exercise, reps).then(() => {
      setLoading(false);
      navigation.popToTop();
      navigation.navigate('WorkoutLog');
    });
  };

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{exercise.name}</Text>
      <TextInput placeholder="Number of Reps" onChangeText={x => setReps(x)} />
      <Button title="Submit Workout" onPress={() => submit(reps)} />
    </View>
  );
}

const styles = StyleSheet.create({});
