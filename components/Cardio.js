import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import utils from '../utils.js';

export default function CardioScreen() {
  const [running, setRunning] = useState(false);
  return running ? <Running /> : <NotRunning />;

  function NotRunning() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.circle} onPress={() => startRun()}>
          <Text style={styles.text}> Start </Text>
        </TouchableOpacity>
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
  function startRun() {
    utils.startRun();
    setRunning(true);
  }
  function endRun() {
    const data = [];
    const distance = 2000;
    utils.stopRun(distance, data);
    setRunning(false);
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
