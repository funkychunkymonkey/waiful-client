import React from 'react';
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
  const allExercises = route.params.exercises;
  const [allEquipments] = React.useState(
    allExercises.reduce((a, b) => {
      b.equipments.forEach(eq => {
        if (!a.includes(eq.name)) a.push(eq.name);
      });
      return a;
    }, []),
  );
  const [allMuscles] = React.useState(
    allExercises.reduce((a, b) => {
      b.muscles.forEach(muscle => {
        if (!a.includes(muscle.name)) a.push(muscle.name);
      });
      return a;
    }, []),
  );
  const [exercises, setExercises] = React.useState(allExercises);
  const [filterEquipment, setFilterEquipment] = React.useState('');
  const [filterMuscle, setFilterMuscle] = React.useState('');

  React.useEffect(() => {
    setExercises(
      filterEquipment === '' && filterMuscle === ''
        ? allExercises
        : allExercises.filter(exercise => {
            if (filterMuscle === '') {
              return exercise.equipments.some(
                equipment => equipment.name === filterEquipment,
              );
            }
            if (filterEquipment === '') {
              return exercise.muscles.some(
                muscle => muscle.name === filterMuscle,
              );
            }
          }),
    );
  }, [filterEquipment, filterMuscle, allExercises]);
  if (exercises.length === 0)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No exercises found.</Text>
      </View>
    );
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {allEquipments.map(eq => (
        <TouchableOpacity
          onPress={() => {
            setFilterEquipment(eq);
          }}>
          <Text>{eq}</Text>
        </TouchableOpacity>
      ))}
      <Text>11111111111111</Text>
      {allMuscles.map(muscle => (
        <TouchableOpacity
          onPress={() => {
            setFilterMuscle(muscle);
          }}>
          <Text>{muscle}</Text>
        </TouchableOpacity>
      ))}
      <FlatList
        data={exercises}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('WorkoutDetail', {exercise: item});
              }}>
              <Text>{item.name}</Text>
              {item.muscles.map(muscle => (
                <Button title={muscle.name} buttonStyle={styles.muscle} />
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
    borderRadius: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  muscle: {
    fontSize: 10,
    padding: 10,
    backgroundColor: '#f00',
  },
  equipment: {
    fontSize: 10,
    padding: 10,
    backgroundColor: 'red',
  },
});
