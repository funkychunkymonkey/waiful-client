import * as React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

import utils from '../../utils.js';
import Loading from '../Loading.js';

export default function WorkoutLog({navigation}) {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
    <ScrollView>
      {logs.map((log, i) => (
        <ListItem
          key={i}
          style={{}}
          title={log.distance + 'm'}
          rightAvatar={<Text>{moment(log.startedAt).fromNow()}</Text>}
          bottomDivider
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});