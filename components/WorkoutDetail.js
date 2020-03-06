import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SegmentedControlIOS,
} from 'react-native';
import WebView from 'react-native-webview';
import {useState} from 'react';
import Loading from './Loading.js';
import utils from '../utils.js';
import {Button, ThemeProvider} from 'react-native-elements';

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

  if (loading) return <Loading />;
  console.log(exercise);

  return (
    <>
      <Text>{exercise.name}</Text>
      <WebView
        source={{html: exercise.description}}
        scalesPageToFit={false}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}></WebView>
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
    </>
  );
}

const styles = StyleSheet.create({});
