import * as React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import COLORS from '../../color';
import utils from '../../utils';

import {useZ, useCollectionZ} from '../../zustand';

export default function DetailHeader({navigation}) {
  const waifus = useZ(z => z.waifus);
  const setWaifus = useZ(z => z.setWaifus);
  const popUpWaifu = useZ(z => z.popUpWaifu);
  const selectedIndex = useCollectionZ(z => z.selectedIndex);
  const setSelectedIndex = useCollectionZ(z => z.setSelectedIndex);

  function sell() {
    const waifu = waifus[selectedIndex];
    utils.sellWaifu(waifu.malId).then(result => {
      navigation.pop();
      setWaifus(waifus.filter(x => x.id !== waifu.id));
      setSelectedIndex(0);
      popUpWaifu({
        waifu: null,
        gems: result,
        auto: false,
      });
    });
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.favHeart,
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={sell}>
      <Icon name="trash" color={'#fff'} />
      <Text style={{color: '#fff', marginLeft: 10}}>Remove</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
