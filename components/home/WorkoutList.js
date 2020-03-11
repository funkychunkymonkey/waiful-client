import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Content} from 'native-base';

import COLORS from '../../color';
import {useZ} from '../../zustand';
import {getSystemAvailableFeaturesSync} from 'react-native-device-info';

export default function WorkoutList({navigation}) {
  const allExercises = useZ(z => z.exercises);
  const [exercises, setExercises] = React.useState(allExercises);
  const [allData] = React.useState({
    equipments: Array.from(
      new Set(allExercises.reduce((a, b) => [...a, ...b.equipments], [])),
    ),
    muscles: Array.from(
      new Set(allExercises.reduce((a, b) => [...a, ...b.muscleGroups], [])),
    ),
  });

  const [filters, setFilters] = React.useState({muscles: [], equipments: []});
  const [search, setSearch] = React.useState('');

  function updateSearch(text) {
    setSearch(text);
  }

  React.useEffect(() => {
    setExercises(
      allExercises.filter(exercise => {
        if (search !== '' && exercise.name.indexOf(search) === -1) {
          return false;
        }
        if (
          filters.muscles.length &&
          !exercise.muscleGroups.some(group => filters.muscles.includes(group))
        )
          return false;
        if (
          filters.equipments.length &&
          filters.equipments.includes('None') &&
          exercise.equipments.length === 0
        )
          return true;
        if (
          filters.equipments.length &&
          !exercise.equipments.some(eq => filters.equipments.includes(eq))
        )
          return false;
        return true;
      }),
    );
  }, [filters, allExercises, search]);

  return (
    <Content style={styles.content}>
      <LinearGradient colors={[COLORS.bgPrimary, COLORS.bgHighlight]}>
        <Text style={styles.titleText}>MUSUCLES</Text>
        <Filters type="muscles" data={allData.muscles} />
        <Text style={styles.titleText}>EQUIPMENTS</Text>
        <Filters type="equipments" data={['None', ...allData.equipments]} />
      </LinearGradient>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <Exercises />
    </Content>
  );

  function Filters({type, data}) {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {data.map((x, i) => (
          <View
            key={i}
            style={{
              opacity: filters[type].includes(x) ? 1.0 : 0.5,
            }}>
            <FilterButton onPress={() => filter(type, x)} text={x} />
          </View>
        ))}
      </View>
    );
  }

  function filter(type, x) {
    if (filters[type].includes(x)) {
      filters[type] = filters[type].filter(xx => xx !== x);
      setFilters({...filters});
    } else {
      filters[type].push(x);
      setFilters({...filters});
    }
  }

  function FilterButton({onPress, text}) {
    return (
      <TouchableOpacity
        style={{...styles.filterCircle}}
        onPress={onPress ? onPress : () => {}}>
        <Text style={{color: '#fff'}}>{text}</Text>
      </TouchableOpacity>
    );
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
            title={exercise.name}
            onPress={() => {
              navigation.navigate('WorkoutDetail', {exercise});
            }}
            rightAvatar={
              <View style={{flexDirection: 'row'}}>
                {exercise.muscleGroups.map(text => (
                  <View style={{...styles.filterMusText}}>
                    <Text style={{color: '#fff'}}>{text}</Text>
                  </View>
                ))}
                {exercise.equipments.map(text => (
                  <View style={{...styles.filterEqText}}>
                    <Text style={{color: '#fff'}}>{text}</Text>
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
  content: {
    backgroundColor: COLORS.bgPrimary,
    width: '100%',
  },
  titleText: {
    color: COLORS.textTitle,
    fontSize: 20,
    margin: 5,
  },
  filterCircle: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fc7349',
  },
  filterEqText: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgHighlight,
  },
  filterMusText: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary,
  },
});
