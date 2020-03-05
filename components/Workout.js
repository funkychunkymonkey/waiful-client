import React from 'react';
import {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

export default function Workout() {
  const [exercises, setExercises] = useState([
    {
      Category: 'Arms',
      Equipment: 'Dumbbell',
      Description:
        'Grab dumbbells and extend arms to side and hold as long as you can',
      Muscles: 'here will be images and stuff',
    },
  ]);
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({item}) => (
          <Text style={styles.item}>{item.Category}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
