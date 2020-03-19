import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SeriesList from './SeriesList.js';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import COLORS from '../../color';
import styles from '../style/Shop';

const Tab = createMaterialTopTabNavigator();
export default function({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Shop`,
    });
  }, [navigation]);
  return (
    <Tab.Navigator
      initialRouteName="SeriesList"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bgPrimary,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
          position: 'absolute',
          top: 0,
        },
        headerTintColor: COLORS.textTitle,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
      }}>
      <Tab.Screen
        name="Anime"
        component={SeriesList}
        initialParams={{malType: 'anime', stackNavigation: navigation}}
        options={{
          tabBarLabel: 'Anime',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Manga"
        component={SeriesList}
        initialParams={{malType: 'manga', stackNavigation: navigation}}
        options={{
          tabBarLabel: 'Manga',
          tabBarIcon: ({color, size}) => (
            <Icon name="grid" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
