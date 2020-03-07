import * as React from 'react';
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
import RNPickerSelect from 'react-native-picker-select';

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
      <RNPickerSelect
        onValueChange={value => setFilterEquipment(value)}
        items={[
          {label: 'Incline bench', value: 'Incline bench'},
          {label: 'Dumbbell', value: 'Dumbbell'},
          {label: 'Kettlebell', value: 'Kettlebell'},
          {label: 'Barbell', value: 'Barbell'},
          {label: 'SZ-Bar', value: 'SZ-Bar'},
          {label: 'Gym mat', value: 'Gym mat'},
          {label: 'Pull-up bar', value: 'Pull-up bar'},
          {label: 'No equipment', value: 'none (bodyweight exercise)'},
        ]}
        style={styles.selector}
        placeholder={{label: 'Select the equipment you want to use', value: ''}}
        Icon={() => (
          <Text
            style={{
              position: 'absolute',
              right: 95,
              fontSize: 18,
              color: '#789',
            }}>
            ▼
          </Text>
        )}
      />
      <RNPickerSelect
        onValueChange={value => setFilterMuscle(value)}
        items={[
          {
            label: 'Obliquus externus abdominis',
            value: 'Obliquus externus abdominis',
          },
          {label: 'Anterior deltoid', value: 'Anterior deltoid'},
          {label: 'Trapezius', value: 'Trapezius'},
          {label: 'Rectus abdominis', value: 'Rectus abdominis'},
          {label: 'Quadriceps', value: 'Quadriceps'},
          {label: 'Gluteus maximus', value: 'Glutes maximus'},
          {label: 'Biceps brachii', value: 'Biceps brachii'},
          {label: 'Triceps brachii', value: 'triceps brachi'},
          {label: 'Pectorails major', value: 'Pectorails major'},
          {label: 'Serratus anterior', value: 'Serratus anterior'},
          {label: 'Soleus', value: 'Soleus'},
          {label: 'Latissimus dorsi', value: 'Latissimus dorsi'},
          {label: 'Bicps femoris', value: 'Biceps femoris'},
          {label: 'Brachialis', value: 'Brachialis'},
        ]}
        style={styles.selector}
        placeholder={{
          label: 'Select the muscle you want to work on',
          value: '',
        }}
        Icon={() => (
          <Text
            style={{
              position: 'absolute',
              right: 95,
              fontSize: 18,
              color: '#789',
            }}>
            ▼
          </Text>
        )}
      />
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
  selector: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30,
    width: 300,
    marginLeft: 30,
  },
});
