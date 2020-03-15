import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Loading from '../Loading.js';
import utils from '../../utils.js';
import COLORS from '../../color';
import {useZ} from '../../zustand';

export default function WorkoutCustom({navigation}) {
  const allExercises = useZ(z => z.exercises);
  const [allData] = React.useState({
    equipments: Array.from(
      new Set(allExercises.reduce((a, b) => [...a, ...b.equipments], [])),
    ),
    muscles: Array.from(
      new Set(allExercises.reduce((a, b) => [...a, ...b.muscleGroups], [])),
    ),
  });
  const [filters, setFilters] = React.useState({muscles: [], equipments: []});
  const [loading, setLoading] = React.useState(false);
  const [exerciseName, setExerciseName] = React.useState('');
  const [exerciseDescription, setExerciseDescription] = React.useState('');

  const register = () => {
    if (!exerciseName || !exerciseDescription) return;
  };

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.wrapper}>
      <LinearGradient
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{...styles.headerGradient, ...styles.headerHead}}>
        <Text style={styles.headerText}>Exercise Name</Text>
      </LinearGradient>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Input
            placeholder="Your Exercise Name"
            onChangeText={x => setExerciseName(x)}
            keyboardType="numeric"
            leftIcon={<Icon name="running" style={styles.formIcon} />}
          />
        </View>
      </View>
      <LinearGradient
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.headerGradient}>
        <Text style={styles.headerText}>Exercise Description</Text>
      </LinearGradient>
      <View style={styles.form}>
        <View style={{...styles.formItem, height: 80}}>
          <TextInput
            placeholder="Exercise Description"
            onChangeText={x => setExerciseDescription(x)}
            keyboardType="numeric"
            multiline
            style={styles.InputDescription}
          />
        </View>
      </View>
      <LinearGradient
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.headerGradient}>
        <Text style={styles.headerText}>Body parts</Text>
      </LinearGradient>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Filters type="muscles" data={allData.muscles} />
        </View>
      </View>
      <LinearGradient
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.headerGradient}>
        <Text style={styles.headerText}>Equipments</Text>
      </LinearGradient>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Filters type="equipments" data={allData.equipments} />
        </View>
      </View>
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        style={{
          ...styles.headerGradient,
          ...styles.headerButt,
          ...styles.formItem,
        }}
      />
      <Button
        title="Register Your Workout"
        onPress={() => submit(reps)}
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

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    marginBottom: 10,
  },
  headerGradient: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
    alignContent: 'center',
  },
  headerHead: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerButt: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: COLORS.textTitle,
    fontSize: 24,
  },
  form: {
    backgroundColor: COLORS.bgSecondary,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formItem: {
    flex: 1,
    marginBottom: 10,
  },
  formIcon: {
    marginRight: 10,
  },
  description: {
    backgroundColor: 'white',
    padding: 20,
  },
  descriptionText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  filtersMus: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa175',
  },
  filtersEq: {
    padding: 6,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary,
  },
  bigIcon: {
    width: 40,
    height: 40,
  },
  InputDescription: {
    textAlignVertical: 'top',
  },
});
