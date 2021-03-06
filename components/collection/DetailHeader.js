import * as React from 'react';
import {Text, Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../../color';
import utils from '../../utils';
import FavButton from './FavButton.js';
import styles from '../style/Collection';

import {useZ, useCollectionZ} from '../../zustand';

export default function DetailHeader() {
  const waifus = useZ(z => z.waifus);
  const setWaifus = useZ(z => z.setWaifus);

  const selectedIndex = useCollectionZ(z => z.selectedIndex);
  const waifu = waifus[selectedIndex];

  const updateFavState = newFavState => {
    const newWaifu = {...waifus[selectedIndex], isFavorite: newFavState};
    const newWaifus = [...waifus];
    newWaifus[selectedIndex] = newWaifu;
    setWaifus(newWaifus);
  };

  const fav = () => {
    if (!waifu.isFavorite) {
      utils
        .setFavWaifu(waifu.malId)
        .then(result => result && updateFavState(true));
    } else {
      utils
        .setUnfavWaifu(waifu.malId)
        .then(result => result && updateFavState(false));
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
      style={styles.headerContainer}>
      <View style={styles.detailHeader1}>
        <Image
          style={styles.headerImage}
          source={{
            uri: waifu.imageUrl,
          }}
        />
        <View style={styles.detailHeader2}>
          <Text style={styles.text1}>{waifu.name}</Text>
          <Text style={styles.text2}>{waifu.series.name}</Text>
        </View>
        <View style={{height: 100}}>
          <FavButton onPress={fav} isFavorite={waifu.isFavorite} />
        </View>
      </View>
    </LinearGradient>
  );
}
