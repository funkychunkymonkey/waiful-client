import * as React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {Button, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import Loading from '../Loading.js';
import utils from '../../utils.js';
import COLORS from '../../color';
import {useZ} from '../../zustand';

export default function WorkoutDetail({route, navigation}, y) {
  const popUpWaifu = useZ(z => z.popUpWaifu);
  const isFocused = useIsFocused();
  const exercise = route.params.exercise;
  const incrementGems = useZ(z => z.incrementGems);
  const [reps, setReps] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (isFocused) {
        popUpWaifu({
          dialogue: 'Ganbare!',
          auto: true,
        });
      }
      return () => {};
    }, []),
  );

  let description = exercise.description
    .replace(/<br>/gi, '\n')
    .replace(/\/<p>/gi, '\n')
    .replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, ' $2 ($1) ')
    .replace(/<(?:.|\s)*?>/g, '');

  const submit = reps => {
    reps = Number(reps);
    if (isNaN(reps) || reps <= 0) return;
    setReps('');
    setLoading(true);
    utils.logExercise(exercise, reps).then(data => {
      setLoading(false);
      navigation.popToTop();
      navigation.navigate('WorkoutLog');
      incrementGems(data.gems);
      popUpWaifu({
        dialogue: 'Great work!!',
        gems: data.gems,
        auto: false,
      });
    });
  };

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.wrapper}>
      <LinearGradient
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{...styles.headerGradient, ...styles.headerHead}}>
        <Text style={styles.headerText}>{exercise.name}</Text>
      </LinearGradient>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Input
            placeholder="Number of Reps"
            onChangeText={x => setReps(x)}
            keyboardType="numeric"
            leftIcon={<Icon name="history" style={styles.formIcon} />}
          />
        </View>
        <Button
          title="Submit Workout"
          onPress={() => submit(reps)}
          raised
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: [COLORS.favHeart, COLORS.favHeart],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
          style={styles.formItem}
        />
      </View>

      <ExerciseMuscles />

      <ExerciseEquipments />

      <ExerciseDescription />

      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        style={{...styles.headerGradient, ...styles.headerButt}}
      />
    </ScrollView>
  );

  function ExerciseDescription() {
    if (exercise.description === '') return <></>;
    return (
      <PanelSection
        title="Description"
        body={
          <View>
            <Text style={styles.descriptionText}>{description}</Text>
            <ExerciseImages />
          </View>
        }
      />
    );
  }

  function ExerciseMuscles() {
    if (exercise.muscles.length === 0) return <></>;
    return (
      <PanelSection
        title="Muscles"
        body={
          <Text style={styles.descriptionText}>
            {exercise.muscles.map(x => x.name).join('\n')}
          </Text>
        }
      />
    );
  }

  function ExerciseEquipments() {
    if (exercise.equipments.length === 0) return <></>;
    return (
      <PanelSection
        title="Equipment"
        body={
          <Text style={styles.descriptionText}>
            {exercise.equipments.join('\n')}
          </Text>
        }
      />
    );
  }
  function PanelSection({title, body}) {
    return (
      <>
        <LinearGradient
          colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.headerGradient}>
          <Text style={styles.headerText}>{title}</Text>
        </LinearGradient>

        <View style={styles.description}>{body}</View>
      </>
    );
  }
  function ExerciseImages() {
    if (exercise.exerciseImages.length === 0) return <></>;
    return (
      <View style={{flexDirection: 'row'}}>
        {exercise.exerciseImages.map(image => (
          <Image
            source={{uri: image.path}}
            style={{flex: 1, height: 100}}
            resizeMode="contain"
          />
        ))}
      </View>
    );
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
});
