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

export default function WorkoutList({route, navigation}) {
  const exercises = route.params.exercises;
  if (exercises.length === 0)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No exercises found.</Text>
      </View>
    );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={exercises}
        renderItem={d => {
          const exercise = d.item;
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('WorkoutDetail', {exercise});
              }}>
              <Text>{exercise.name}</Text>
              {exercise.muscles.map(muscle => (
                <Button title={muscle.name} buttonStyle={styles.muscle} />
              ))}
              {exercise.equipments.map(equipment => (
                <Button title={equipment.name} buttonStyle={styles.equipment} />
              ))}
            </TouchableOpacity>
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
