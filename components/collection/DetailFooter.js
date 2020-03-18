import * as React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import utils from '../../utils';
import {useZ, useCollectionZ} from '../../zustand';
import styles from '../style/Collection';

export default function DetailHeader({navigation}) {
  const waifus = useZ(z => z.waifus);
  const setWaifus = useZ(z => z.setWaifus);
  const popUpWaifu = useZ(z => z.popUpWaifu);
  const incrementGems = useZ(z => z.incrementGems);
  const selectedIndex = useCollectionZ(z => z.selectedIndex);
  const setSelectedIndex = useCollectionZ(z => z.setSelectedIndex);

  function sell() {
    const waifu = waifus[selectedIndex];
    utils.sellWaifu(waifu.malId).then(result => {
      navigation.pop();
      setWaifus(waifus.filter(x => x.id !== waifu.id));
      incrementGems(result);
      setSelectedIndex(0);
      popUpWaifu({
        waifu: null,
        gems: result,
        auto: false,
      });
    });
  }

  return (
    <TouchableOpacity style={styles.footer} onPress={sell}>
      <Icon name="trash" color={'#fff'} />
      <Text style={{color: '#fff', marginLeft: 10}}>Remove</Text>
    </TouchableOpacity>
  );
}
