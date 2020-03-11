import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../../color';
import {useZ} from '../../zustand';

export default function HomeScreen({navigation}) {
  const popUpWaifu = useZ(z => z.popUpWaifu);

  useFocusEffect(
    React.useCallback(() => {
      popUpWaifu({
        dialogue: 'Welcome back!',
        auto: true,
      });
      return () => {};
    }, []),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('WorkoutList')}>
        <LinearGradient
          colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
          style={styles.circle}>
          <Icon name="dumbbell" size={100} color="#fff" />
          <Text style={styles.text}> Workout </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('Cardio')}>
        <LinearGradient
          colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
          style={styles.circle}>
          <Icon name="running" size={100} color="#fff" />
          <Text style={styles.text}> Cardio </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  circle: {
    margin: 10,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: COLORS.bgPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color: COLORS.textTitle,
    textTransform: 'uppercase',
  },
});