import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from 'react-native';
import {set, eq} from 'react-native-reanimated';

export default function WorkoutList({route, navigation}) {
  const [text, setText] = useState('');
  const exercises = route.params.exercises;
  const [exercisesData, setExercisesData] = useState(exercises);
  const filterByEquipment = text => {
    setExercisesData(prevData => {
      return prevData.filter(exercise => {
        console.log(text);
        console.log(exercise.equipments.some(x => x.name === text));
        return exercise.equipments.some(x => x.name === text);
      });
    });
  };
  if (exercises.length === 0)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No exercises found.</Text>
      </View>
    );
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={styles.input}
        placeholder="search"
        onChangeText={value => {
          filterByEquipment(value);
        }}
        value={text}
      />
      <Button title="filter by equipment" />
      <FlatList
        data={exercisesData}
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
  input: {
    marginBottom: 10,
    padding: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
});
