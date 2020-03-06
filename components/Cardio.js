import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Loading from './Loading.js';
import utils from '../utils.js';

export default function CardioScreen({navigation}) {
  const [currentRun, setCurrentRun] = useState(null);
  const [panel, setPanel] = useState('LOADING');
  useFocusEffect(
    React.useCallback(() => {
      utils.getRun().then(data => {
        if (data === null) {
          setPanel('WAITING');
        } else {
          setPanel('RUNNING');
          setCurrentRun(data);
        }
      });
      return () => {
        setPanel('LOADING');
        setCurrentRun(null);
      };
    }, []),
  );
  switch (panel) {
    case 'LOADING':
      return <Loading />;
    case 'WAITING':
      return <NotRunning />;
    case 'RUNNING':
      return <Running />;
    case 'RESULT':
      return <Result />;
  }
  return currentRun ? <Running /> : <NotRunning />;

  /******** PANELS ********/

  function NotRunning() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.circle} onPress={() => startRun()}>
          <Text style={styles.text}> Start </Text>
        </TouchableOpacity>
        <Button title="View Run Log" onPress={() => goLogs()} />
      </View>
    );
  }
  function Running() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.circle} onPress={() => endRun()}>
          <Text style={styles.text}> Stop </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function Result() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.text}>
          You ran {currentRun.distance}m! Good work.
        </Text>
        <Button title="Good work!" onPress={() => endResult()} />
      </View>
    );
  }

  /******** UTILS ********/

  function startRun() {
    setPanel('LOADING');
    utils.startRun().then(data => {
      setPanel('RUNNING');
      setCurrentRun(data);
    });
  }
  function endRun() {
    const data = [];
    const distance = 2000;
    setPanel('LOADING');
    utils.stopRun(distance, data).then(data => {
      setPanel('RESULT');
      setCurrentRun(data);
    });
  }
  function endResult() {
    setCurrentRun(null);
    setPanel('WAITING');
  }
  function goLogs() {
    navigation.navigate('CardioLog');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 50,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#ffa880ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
