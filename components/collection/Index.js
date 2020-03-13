import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import COLORS from '../../color';
import Collection from './Collection.js';
import Detail from './Detail.js';

import {useZ, useCollectionZ} from '../../zustand';

const Stack = createStackNavigator();
export default function() {
  const waifus = useZ(z => z.waifus);
  const selectedIndex = useCollectionZ(z => z.selectedIndex);
  const waifu = useCollectionZ(z => z.waifu);
  const setWaifu = useCollectionZ(z => z.setWaifu);

  React.useEffect(() => {
    setWaifu(waifus[selectedIndex]);
  }, [selectedIndex, waifus]);

  return (
    <Stack.Navigator
      initialRouteName="Collection"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bgPrimary,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
        },
        headerTintColor: COLORS.textTitle,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{title: waifu ? waifu.name : 'Detail', headerBackTitle: ' '}}
      />
    </Stack.Navigator>
  );
}
