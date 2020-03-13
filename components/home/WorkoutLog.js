import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import moment from 'moment';

import utils from '../../utils.js';
import Loading from '../Loading.js';

export default function WorkoutLog({navigation}) {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      utils.getWorkouts().then(data => {
        setLoading(false);
        setLogs(data);
      });
      return () => {
        setLoading(true);
      };
    }, []),
  );

  if (loading) return <Loading />;
  if (logs.length === 0)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No workouts found.</Text>
      </View>
    );
  return (
    <View>
      {logs.map((log, i) => (
        <ListItem
          key={i}
          style={{}}
          title={log.exercise.name}
          subtitle={log.reps + ' reps'}
          rightAvatar={<Text>{moment(log.createdAt).format('LLLL')}</Text>}
          bottomDivider
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
