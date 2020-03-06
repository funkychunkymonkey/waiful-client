import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Loading from './Loading.js';
import utils from '../utils.js';

export default function CardioScreen() {
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
      </View>
    );
  }

  /******** UTILS ********/

  function startRun() {
    utils.startRun().then(data => setCurrentRun(data));
  }
  function endRun() {
    const data = [];
    const distance = 2000;
    utils.stopRun(distance, data);
    setCurrentRun(null);
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
