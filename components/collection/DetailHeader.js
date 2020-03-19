import * as React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../../color';
import utils from '../../utils';
import FavButton from './FavButton.js';

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
      style={{
        width: wp(100),
        justifyContent: 'center',
        padding: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{
            borderRadius: 20,
            width: hp('9%'),
            height: hp('9%'),
            position: 'relative',
          }}
          source={{
            uri: waifu.imageUrl,
          }}
        />
        <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
          <Text style={{color: COLORS.textTitle, fontSize: 28}}>
            {waifu.name}
          </Text>
          <Text style={{color: COLORS.textTitle, fontSize: 20}}>
            {waifu.series.name}
          </Text>
        </View>
        <View style={{height: 100}}>
          <FavButton onPress={fav} isFavorite={waifu.isFavorite} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
