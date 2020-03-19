import * as React from 'react';
import {StyleSheet} from 'react-native';

import SeriesList from './SeriesList.js';
import Personalities from '../settings/Personalities.js';
import Ikigai from '../Ikigai';

import COLORS from '../../color';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
export default function({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Shop`,
    });
  }, [navigation]);
  return (
    <>
      <Ikigai />
      <Tab.Navigator
        initialRouteName="SeriesList"
        tabBarOptions={{
          labelStyle: {
            color: COLORS.textTitle,
            fontSize: 16,
          },
          indicatorStyle: {
            height: 5,
            backgroundColor: COLORS.bgPrimary,
          },
          style: {
            backgroundColor: COLORS.bgHighlight,
          },
        }}>
        <Tab.Screen
          name="Anime Characters"
          component={SeriesList}
          initialParams={{malType: 'anime', stackNavigation: navigation}}
          options={{
            tabBarLabel: 'Anime',
          }}
        />
        <Tab.Screen
          name="Manga Characters"
          component={SeriesList}
          initialParams={{malType: 'manga', stackNavigation: navigation}}
          options={{
            tabBarLabel: 'Manga',
          }}
        />
        <Tab.Screen
          name="Quote Sets"
          component={Personalities}
          options={{
            tabBarLabel: 'Quotes',
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
  },
  body: {
    backgroundColor: COLORS.bgSecondary,
  },
});
