import * as React from 'react';
import {Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Loading from '../Loading.js';
import utils from '../../utils.js';
import COLORS from '../../color';
import {useZ} from '../../zustand';
import styles from '../style/Workout';

export default function WorkoutCustom({navigation}) {
  const allExercises = useZ(z => z.exercises);
  const reloadExercises = useZ(z => z.reloadExercises);
  const [allData] = React.useState({
    equipments: Array.from(
      new Set(allExercises.reduce((a, b) => [...a, ...b.equipments], [])),
    ),
    muscles: Array.from(
      new Set(allExercises.reduce((a, b) => [...a, ...b.muscleGroups], [])),
    ),
  });

  const [filters, setFilters] = React.useState({muscles: [], equipments: []});
  const [exerciseName, setExerciseName] = React.useState('');
  const [exerciseDescription, setExerciseDescription] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const register = () => {
    if (
      !exerciseName &&
      !exerciseDescription &&
      (!filters.muscles || !filters.muscles)
    )
      return;
    setLoading(true);
    utils
      .registerExercise(
        exerciseName,
        exerciseDescription,
        filters.muscles,
        filters.equipments,
      )
      .then(data => {
        reloadExercises();
        setExerciseName('');
        setExerciseDescription('');
        setFilters({muscles: [], equipments: []});
        setLoading(false);
        navigation.popToTop();
        navigation.navigate('WorkoutList');
      });
  };

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.wrapper}>
      <RenderLinearGradient text="Exercise Name" />

      <View style={styles.form}>
        <View style={styles.formItemCustom}>
          <Input
            placeholder="Your Exercise Name"
            onChangeText={x => setExerciseName(x)}
            keyboardType="ascii-capable"
            leftIcon={<Icon name="running" style={styles.formIcon} />}
          />
        </View>
      </View>

      <RenderLinearGradient text="Exercise Description" />

      <View style={styles.form}>
        <View style={{...styles.formItemCustom, height: 80}}>
          <TextInput
            placeholder="Exercise Description"
            onChangeText={x => setExerciseDescription(x)}
            keyboardType="ascii-capable"
            multiline
            style={styles.InputDescription}
          />
        </View>
      </View>

      <RenderLinearGradient text="Body parts" />

      <View style={styles.form}>
        <View style={styles.formItemCustom}>
          <Filters type="muscles" data={allData.muscles} />
        </View>
      </View>

      <RenderLinearGradient text="Equipments" />

      <View style={styles.form}>
        <View style={styles.formItemCustom}>
          <Filters type="equipments" data={allData.equipments} />
        </View>
      </View>

      <RenderLinearGradient />

      <Button
        title="Register Your Workout"
        onPress={() => register()}
        raised
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: [COLORS.favHeart, COLORS.favHeart],
          start: {x: 0, y: 0.5},
          end: {x: 1, y: 0.5},
        }}
        style={styles.formButton}
      />
    </ScrollView>
  );

  function RenderLinearGradient({text}) {
    return (
      <LinearGradient
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={
          text === 'Exercise Name'
            ? {...styles.headerGradient, ...styles.headerHead}
            : text === undefined
            ? {
                ...styles.headerGradient,
                ...styles.headerButt,
                ...styles.formItemCustom,
              }
            : {...styles.headerGradient}
        }>
        {!text ? <></> : <Text style={styles.headerText}>{text}</Text>}
      </LinearGradient>
    );
  }

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
          type === 'muscles'
            ? {...styles.filtersMusCustom}
            : {...styles.filtersEq}
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
    else if (text === 'Front') img = require('../../assets/body/Front.png');
    else if (text === 'Arms') img = require('../../assets/body/Arms.png');
    else if (text === 'Back') img = require('../../assets/body/Back.png');
    else if (text === 'Legs') img = require('../../assets/body/Legs.png');
    else img = require('../../assets/eqipments/None.png');
    return img;
  }
}
