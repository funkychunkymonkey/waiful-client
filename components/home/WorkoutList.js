import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ListItem, SearchBar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Content} from 'native-base';

import COLORS from '../../color';
import {useZ} from '../../zustand';

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
        <Filters type="muscles" data={allData.muscles} />
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
      <ScrollView horizontal={true}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {data.map((x, i) => (
            <View
              key={i}
              style={{
                opacity: filters[type].includes(x) ? 1.0 : 0.6,
              }}>
              <FilterButton
                onPress={() => filter(type, x)}
                text={x}
                type={type}
              />
            </View>
          ))}
          {type === 'muscles' ? (
            <View style={{opacity: 0.6, left: '100%'}}>
              <TouchableOpacity
                style={{...styles.filtersMus}}
                onPress={() => {
                  navigation.navigate('WorkoutCustom', allData);
                }}>
                <Image
                  style={styles.bigIcon}
                  source={require('../../assets/others/ExclamationMark.png')}
                  resizeMode="contain"
                />
                <Text style={{color: '#fff'}}>Add New Exe</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
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

  function FilterButton({onPress, text, type}) {
    return (
      <TouchableOpacity
        style={
          type === 'muscles' ? {...styles.filtersMus} : {...styles.filtersEq}
        }
        onPress={onPress ? onPress : () => {}}>
        <Image
          style={styles.bigIcon}
          source={SetImage(text)}
          resizeMode="contain"
        />
        <Text style={{color: '#fff'}}>{text}</Text>
      </TouchableOpacity>
    );
  }
  function Exercises() {
    if (exercises.length === 0)
      return (
        <View style={styles.none}>
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
                  <View style={{...styles.filterMus}}>
                    <Image
                      style={styles.bigIcon}
                      source={SetImage(text)}
                      resizeMode="contain"
                    />
                  </View>
                ))}
                {exercise.equipments.map(text => (
                  <View style={{...styles.filterEq}}>
                    <Image
                      style={styles.bigIcon}
                      source={SetImage(text)}
                      resizeMode="contain"
                    />
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

  function SetImage(text) {
    let img;
    if (text === 'Barbell') img = require('../../assets/eqipments/Barbell.png');
    else if (text === 'Dumbbell')
      img = require('../../assets/eqipments/Dumbbell.png');
    else if (text === 'Kettlebell')
      img = require('../../assets/eqipments/Kettlebell.png');
    else if (text === 'Bench')
      img = require('../../assets/eqipments/Bench.png');
    else if (text === 'SZ-Bar')
      img = require('../../assets/eqipments/SZ-Bar.png');
    else if (text === 'Pull-up bar')
      img = require('../../assets/eqipments/Pull-upBar.png');
    else if (text === 'None') img = require('../../assets/eqipments/None.png');
    else if (text === 'Front') img = require('../../assets/body/Front.png');
    else if (text === 'Arms') img = require('../../assets/body/Arms.png');
    else if (text === 'Back') img = require('../../assets/body/Back.png');
    else if (text === 'Legs') img = require('../../assets/body/Legs.png');
    else img = require('../../assets/eqipments/None.png');
    return img;
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
  filtersEq: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8C404',
  },
  filtersMus: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa175',
  },
  bigIcon: {
    width: 40,
    height: 40,
  },
  filterEq: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary,
  },
  filterMus: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgHighlight,
  },
  none: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});
