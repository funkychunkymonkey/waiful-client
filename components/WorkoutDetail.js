import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useState} from 'react';

export default function WorkoutDetail({route, navigation}, y) {
  const exercise = route.params.exercise;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{exercise.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
