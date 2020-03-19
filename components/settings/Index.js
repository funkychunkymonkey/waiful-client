import * as React from 'react';
import {Text} from 'react-native';

import {Content, List, ListItem, Icon, Left, Right} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsSeries from './Series.js';
import SettingsSeriesAdd from './SeriesAdd.js';

import COLORS from '../../color';
import styles from '../style/Setting';

const Stack = createStackNavigator();
export default function() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bgPrimary,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
        },
        headerTintColor: COLORS.textTitle,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
      }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="SettingsAnime"
        component={SettingsSeries}
        initialParams={{malType: 'anime'}}
      />
      <Stack.Screen
        name="SettingsManga"
        component={SettingsSeries}
        initialParams={{malType: 'manga'}}
      />
      <Stack.Screen
        name="SettingsSeriesAdd"
        component={SettingsSeriesAdd}
        initialParams={{malType: 'anime'}}
      />
    </Stack.Navigator>
  );
}

function Settings({navigation}) {
  return (
    <Content style={styles.body}>
      <List>
        <ListItem onPress={() => navigation.navigate('SettingsAnime')}>
          <Left>
            <Text>Anime Settings</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('SettingsManga')}>
          <Left>
            <Text>Manga Settings</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </Content>
  );
}
