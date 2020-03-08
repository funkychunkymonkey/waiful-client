import * as React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Loading from './Loading.js';
import utils from '../utils.js';
import {Button, ThemeProvider} from 'react-native-elements';

export default function WorkoutDetail({route, navigation}, y) {
  const exercise = route.params.exercise;
  const [reps, setReps] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  let description = exercise.description
    .replace(/<br>/gi, '\n')
    .replace(/<p\/?>/gi, '\n')
    .replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, ' $2 ($1) ')
    .replace(/<(?:.|\s)*?>/g, '');
  console.log('o', exercise.description);
  console.log('p', description);

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

  if (loading) return <Loading />;

  return (
    <View>
      <Text>{exercise.name}</Text>
      <Text>{description}</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10,
          textAlign: 'center',
        }}
        placeholder="Number of Reps"
        onChangeText={x => setReps(x)}
      />
      <Button title="Submit Workout" onPress={() => submit(reps)} />
    </View>
  );
}

const styles = StyleSheet.create({});
