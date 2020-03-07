import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import {Content} from 'native-base';

export default function WorkoutList({route, navigation}) {
  const allExercises = route.params.exercises;
  const [allEquipments] = React.useState(equipmentsFromExercises(allExercises));
  const [allMuscleGroups] = React.useState(
    muscleGroupsFromExercises(allExercises),
  );
  const [exercises, setExercises] = React.useState(allExercises);
  const [filterEquipments, setFilterEquipments] = React.useState('');
  const [filterMuscles, setFilterMuscles] = React.useState([]);
  const [search, setSearch] = React.useState('');

  function equipmentsFromExercises(exercises) {
    return exercises.reduce((a, b) => {
      b.equipments.forEach(eq => {
        if (!a.includes(eq.name)) a.push(eq.name);
      });
      return a;
    }, []);
  }
  function muscleGroupsFromExercises(exercises) {
    return exercises.reduce((a, b) => {
      b.muscles.forEach(muscle => {
        muscle.muscleGroups.forEach(group => {
          if (!a.includes(group.name)) a.push(group.name);
        });
      });
      return a;
    }, []);
  }

  function updateSearch(text) {
    setSearch(text);
  }

  React.useEffect(() => {
    setExercises(
      filterEquipments.length === 0 &&
        filterMuscles.length === 0 &&
        search === ''
        ? allExercises
        : allExercises.filter(exercise => {
            if (search !== '' && exercise.name.indexOf(search) === -1) {
              return false;
            }
            if (filterMuscles.length) {
              const result = exercise.muscles.some(muscle =>
                muscle.muscleGroups.some(group =>
                  filterMuscles.includes(group.name),
                ),
              );
              if (!result) return false;
            }
            if (filterEquipments.length) {
              if (filterEquipments.includes('None')) {
                if (exercise.equipments.length === 0) return true;
              }
              const result = exercise.equipments.some(equipment =>
                filterEquipments.includes(equipment.name),
              );
              if (!result) return false;
            }
            return true;
          }),
    );
  }, [filterEquipments, filterMuscles, allExercises, search]);

  return (
    <Content>
      <View>
        <MuscleGroupFilters />
        <EquipmentFilters />
      </View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <Exercises />
    </Content>
  );

  function MuscleGroupFilters() {
    return (
      <View style={{flexDirection: 'row', backgroundColor: '#ffa880'}}>
        {allMuscleGroups.map((x, i) => (
          <View
            key={i}
            style={{
              opacity: filterMuscles.includes(x) ? 1.0 : 0.5,
            }}>
            <TouchableOpacity
              style={{...styles.filterCircle, ...styles.filterMuscle}}
              onPress={() => filterMuscle(x)}>
              <Text>{x}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
  function filterMuscle(muscle) {
    if (filterMuscles.includes(muscle)) {
      setFilterMuscles(filterMuscles.filter(x => x !== muscle));
    } else {
      setFilterMuscles([...filterMuscles, muscle]);
    }
  }

  function EquipmentFilters() {
    return (
      <View style={{flexDirection: 'row', backgroundColor: '#ffa880'}}>
        <View
          style={{
            opacity: filterEquipments.includes('None') ? 1.0 : 0.5,
          }}>
          <TouchableOpacity
            style={{...styles.filterCircle, ...styles.filterEquipment}}
            onPress={() => filterEquipment('None')}>
            <Text>{'None'}</Text>
          </TouchableOpacity>
        </View>
        {allEquipments.map((x, i) => (
          <View
            key={i}
            style={{
              opacity: filterEquipments.includes(x) ? 1.0 : 0.5,
            }}>
            <TouchableOpacity
              style={{...styles.filterCircle, ...styles.filterEquipment}}
              onPress={() => filterEquipment(x)}>
              <Text>{x}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
  function filterEquipment(equipment) {
    if (filterEquipments.includes(equipment)) {
      setFilterEquipments(filterEquipments.filter(x => x !== equipment));
    } else {
      setFilterEquipments([...filterEquipments, equipment]);
    }
  }
  function Exercises() {
    if (exercises.length === 0)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No exercises found.</Text>
        </View>
      );
    return (
      <View>
        {exercises.map((exercise, i) => (
          <ListItem
            key={i}
            style={{}}
            title={exercise.name}
            onPress={() => {
              navigation.navigate('WorkoutDetail', {exercise});
            }}
            rightAvatar={
              <View style={{flexDirection: 'row'}}>
                {muscleGroupsFromExercises([exercise]).map((x, i) => (
                  <View
                    style={{...styles.filterCircle, ...styles.filterMuscle}}
                    key={i}>
                    <Text>{x}</Text>
                  </View>
                ))}
                {equipmentsFromExercises([exercise]).map((x, i) => (
                  <View
                    style={{...styles.filterCircle, ...styles.filterEquipment}}
                    key={i}>
                    <Text>{x}</Text>
                  </View>
                ))}
              </View>
            }
            bottomDivider
          />
        ))}
      </View>
    );
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
  item: {
    borderRadius: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterCircle: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterEquipment: {
    backgroundColor: '#fed14d',
  },
  filterMuscle: {
    backgroundColor: '#fed14d',
  },
});
