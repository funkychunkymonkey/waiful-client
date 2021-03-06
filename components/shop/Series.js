import * as React from 'react';
import SeriesList from './SeriesList.js';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Personalities from '../settings/Personalities.js';
import Ikigai from '../Ikigai';

import COLORS from '../../color';

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
          initialParams={{malType: 'anime'}}
          options={{
            tabBarLabel: 'Anime',
          }}
        />
        <Tab.Screen
          name="Manga Characters"
          component={SeriesList}
          initialParams={{malType: 'manga'}}
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
