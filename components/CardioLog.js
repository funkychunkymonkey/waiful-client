import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import utils from '../utils.js';
import Loading from './Loading.js';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

export default function WorkoutLog({navigation}) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      utils.getRuns().then(data => {
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
        <Text>No runs found.</Text>
      </View>
    );
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={logs}
        renderItem={d => {
          const run = d.item;
          return (
            <Text style={styles.item}>
              <Text>{run.distance}m</Text>
              <Text>{run.startedAt}</Text>
              <Text>{run.endedAt}</Text>
            </Text>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 50,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  muscle: {
    fontSize: 10,
    backgroundColor: '#f00',
  },
  equipment: {
    fontSize: 10,
    backgroundColor: '#0f0',
  },
});
